# -*- coding: utf-8 -*-
from __future__ import division
#Flask dependencies
from flask import Blueprint, request, render_template, redirect, url_for, session, g
from ..utils import Utils as DBUtils
from src import app

import json


# Define the blueprint: 'list', set its url prefix: app.url/list
mod_list = Blueprint('list', __name__, url_prefix='/list')

def get_columns_from_session_db():
	headers = DBUtils().get_keys()
	columns_to_be_removed = ['_id', 'SUMMARY']
	for key in headers:
		if key.startswith("__"):
			columns_to_be_removed.append(key)

	for key in columns_to_be_removed:
		if key in headers: headers.remove(key)

	return headers

def get_column_list(is_admin_interface = False):
	headers = get_columns_from_session_db()
	return headers

def get_columns_with_list_content():
	key_list = DBUtils().get_keys()
	session_db = DBUtils().get_session_db()

	list_columns = []
	for column_name in key_list:
		if column_name in ['_id', '__read_count']:
			continue

		data_dict = session_db.find_one({column_name:{"$exists": True}})
		if type(data_dict[column_name]) is list:
			list_columns.append(column_name)
	return list_columns

@mod_list.route('/get-list-entity-types')
def get_list_entity_types():
	return json.dumps(get_column_list())

@mod_list.route('/get-list-contents')
def get_list_contents():
	headers = get_column_list()
	session_db = DBUtils().get_session_db()
	list_columns = get_columns_with_list_content()

	print list_columns

	all_data = []
	for header in headers:
		aggregate_array = []
		
		if header in list_columns:
			aggregate_array.append({ '$unwind' : '$'+header })
		
		aggregate_array.extend([
				{'$match':{ header : {'$ne' : ''} }}, 
				{'$group':{'_id':'$'+header,'count': { '$sum': 1 }}},
				{'$group':{'_id':0, 'maxCount':{'$max':'$count'}, 'docs':{'$push':'$$ROOT'}}},
				{'$project':{'_id':0, 'docs':{'$map':{'input':'$docs','as':'e', 'in':{'_id':'$$e._id', 'count':'$$e.count', 'rate':{'$divide':["$$e.count", "$maxCount"]}}}}}},
				{'$unwind':'$docs'},
				{'$project':{'name':'$docs._id', 'count':'$docs.count','frequency':'$docs.rate','strength':{'$literal':0},'hasStrength':{'$literal':0},'strengthCount':{'$literal':0}}}
		])
		
		content_list = session_db.aggregate(aggregate_array)['result']
		if content_list:
			print content_list, [item['count'] for item in content_list]

			if max([item['count'] for item in content_list]) == 1:
				temp_list = content_list
				content_list = []
				new_count = 1/len(temp_list)
				for dict_item in temp_list:
					dict_item['frequency'] = new_count
					content_list.append(dict_item)

			all_data.append({
				"key": header,
				"values": content_list
			})

	return json.dumps(all_data)

@mod_list.route('/get-updated-list-contents', methods=["POST"])
def get_updated_list_contents():
	data = request.json
	if data['mode'] == 'Any':
		return get_updated_list_contents_any_mode(data['params'], data['column_list'])
	elif data['mode'] == 'All':
		return get_updated_list_contents_all_mode(data['params'], data['column_list'])
	elif data['mode'] == 'And':
		return get_updated_list_contents_and_mode(data['params'], data['column_list'])
	elif data['mode'] == 'All-Any':
		return get_updated_list_contents_all_any_mode(data['params'], data['column_list'])

def get_updated_list_contents_any_mode(params, column_list):
	'''
	Return strengths for entities related to any of the current selections
	'''
	or_params = []
	for column_params in params:
		or_params.append({ column_params['column']: { '$in' : column_params['values'] } })
	return get_aggregate_query_result({'$or':or_params}, column_list)

def get_updated_list_contents_and_mode(params, column_list):
	'''
	Entities connected to all of the current selections, through a single document
	'''
	and_params = []
	for column_params in params:
		and_params.append({ column_params['column']: { '$all' : column_params['values'] } })
	return get_aggregate_query_result({'$and':and_params}, column_list)

def get_updated_list_contents_all_any_mode(params, column_list):
	'''
	Entities connected to all of the selections across lists, but any of the selections within a list
	'''
	and_params = []
	for column_params in params:
		and_params.append({ column_params['column']: { '$in' : column_params['values'] } })
	return get_aggregate_query_result({'$and':and_params}, column_list)

def get_updated_list_contents_all_mode(params, column_list):
	'''
	Entities connected to all of the current selections, though not necessarily in the same document
	'''
	all_data = []
	session_db = DBUtils().get_session_db()
	list_columns = get_columns_with_list_content()

	for header in column_list:
		values_set_once = False

		dict_intersecting_column_values = {}
		for column_params in params:
			column_name = column_params['column']
			for column_value in column_params['values']:
				aggregate_array = [{'$match':{ column_name : column_value }}]

				if header in list_columns:
					aggregate_array.append({ '$unwind' : '$' + header })

				aggregate_array.extend([
					{ '$group':  {'_id': '$'+header, 'ids' : {'$addToSet': '$_id'}} }
				]);
				
				value_match_list = session_db.aggregate(aggregate_array)['result']
				dict_values_match = dict((x['_id'], x['ids']) for x in value_match_list)
				# print dict_values_match

				if not dict_intersecting_column_values and not values_set_once:
					values_set_once = True
					dict_intersecting_column_values = dict_values_match
				else:
					dict_intersecting_column_values = get_intersecting_documents(dict_intersecting_column_values, dict_values_match)
				
				if not dict_intersecting_column_values:
					break

				# print column_name, column_value, value_match_list

			if not dict_intersecting_column_values:
				all_data.append({'key':header, 'values':[]})
				break
		
		if dict_intersecting_column_values:
			all_data.append({'key':header, 'values': get_column_values(dict_intersecting_column_values)})

	return json.dumps(all_data)

def get_column_values(dict_values):
	list_values = []
	total_count = 0
	for key, value in dict_values.iteritems():
		total_count += len(value)

	for key, value in dict_values.iteritems():
		list_value = {}
		list_value['count'] = len(value)
		list_value['strength'] = list_value['count'] / total_count
		list_value['name'] = key
		list_values.append(list_value)

	return list_values

def get_intersecting_documents(dict_a, dict_b):
	dict_intersection = {}
	for key in dict_a.keys():
		if key in dict_b:
			dict_intersection[key] = {}
			dict_intersection[key] = list(set(dict_a[key] + dict_b[key]))
	return dict_intersection

def get_aggregate_query_result(match_params, column_list):
	all_data = []
	session_db = DBUtils().get_session_db()
	list_columns = get_columns_with_list_content()

	for header in column_list:
		aggregate_array = [{ '$match': match_params }]
		
		if header in list_columns:
			aggregate_array.append({ '$unwind' : '$'+header })
		
		aggregate_array.extend([
			{ '$group':  {'_id': '$'+header, 'count': { '$sum': 1 }} },
			{ '$group':{'_id':0, 'maxCount':{'$max':'$count'}, 'docs':{'$push':'$$ROOT'}}},
			{ '$project':{'_id':0, 'docs':{'$map':{'input':'$docs','as':'e', 'in':{'_id':'$$e._id', 'count':'$$e.count', 'rate':{'$divide':["$$e.count", "$maxCount"]}}}}}},
			{ '$unwind':'$docs'},
			{ '$project':{'name':'$docs._id', 'count':'$docs.count','strength':'$docs.rate'}}
		])	
		raw_list = session_db.aggregate(aggregate_array)['result']

		all_data.append({
			'key': header,
			'values': raw_list
		})
	return json.dumps(all_data)
