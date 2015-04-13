from flask import Blueprint, request, render_template, redirect, url_for, session
from ..utils import Utils as DBUtils
from werkzeug import secure_filename
from src import app

import md5, datetime
import ner
import os
import zipfile
import glob
import re
import json

# Define the blueprint: 'data', set its url prefix: app.url/data
mod_data = Blueprint('data', __name__, url_prefix='/data')

###########################
#FILE UPLOAD CONFIGURATION#

ALLOWED_EXTENSIONS = set(['zip'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

###########################

@mod_data.route("/", methods=['GET','POST'])
def index():
	if request.method == 'POST':
		file = request.files['file']
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file_name_without_extension = filename.rsplit('.', 1)[0]

			md5sum_generator = md5.new()
			md5sum_generator.update(filename)
			md5sum_generator.update(datetime.datetime.now().isoformat())
			collection_name = md5sum_generator.hexdigest()
			file_path = os.path.join(app.config['UPLOAD_FOLDER'], collection_name, filename)
			directory_path =  os.path.join(app.config['UPLOAD_FOLDER'], collection_name)
			destination_path = os.path.join(app.config['UPLOAD_FOLDER'], collection_name, file_name_without_extension)

			if not os.path.exists(directory_path):
				os.makedirs(directory_path, mode=0777)
				os.chmod(directory_path, 0777)

			file.save(file_path)
			
			with zipfile.ZipFile(file_path, "r") as z:
				z.extractall(destination_path)

			os.remove(file_path)

			tagger = ner.SocketNER(host="localhost", port=8080)

			for input_file_name in glob.glob(destination_path+"/*.txt"):
				dict_entities = {}
				file_content = []

				no_of_entities = 0

				file_line_content = filter(None, [re.sub(r'[^\x00-\x7F]+',' ', line.rstrip('\n\r')).strip() for line in open(input_file_name, 'r')])
				for line in file_line_content:
					dict_line_entities = tagger.get_entities(line)
					file_content.append(tagger.tag_text(line))
					
					for key, value in dict_line_entities.iteritems():
						no_of_entities += len(value)
						if key in dict_entities:
							dict_entities[key] = list(set(dict_entities[key] + value))
						else:
							dict_entities[key] = list(set(value))
				
				# list_entity_frequency = []
				# str_content = " ".join(file_content)

				# value_template = "<{{type}}>{{value}}</{{type}}>"
				# for entity_type,list_value in dict_entities.iteritems():
				# 	for value in list_value:
				# 		value_str = value_template.replace("{{type}}",entity_type).replace("{{value}}",value)
				# 		list_entity_frequency.append([value_str,str_content.count(value_str)])

				# dict_entities['__entity_frequency'] = list_entity_frequency
				# dict_entities['__word_frequency'] = tfidf_parser.compute_word_frequency(file_line_content)

				#blob_file_content = TextBlob(str_content)
				#dict_entities['__document_length'] = len(re.findall(r'\w+', str_content))
				#dict_entities['__num_entities'] = no_of_entities
				#dict_entities['__polarity'] =  blob_file_content.sentiment.polarity
				#dict_entities['__subjectivity'] = blob_file_content.sentiment.subjectivity
				
				dict_entities['__formatted_content'] = file_content
				dict_entities['__content'] = file_line_content

				# if(request.form['title'] != "?"):
				# 	selected_title_option = int(request.form['title'])
				# 	if(selected_title_option == 1):
				# 		dict_entities['TITLE'] = os.path.basename(input_file_name)
				# 	else:
				# 		dict_entities['TITLE'] = file_line_content[selected_title_option-1]

				# dict_entities['SUMMARY'] = pageRankSummarizer.summarize(file_line_content, int(request.form['summary-lines']))
				dict_entities['SUMMARY'] = []
				dict_entities['ID'] = os.path.basename(input_file_name)
				dict_entities['__read_count'] = 0
				data_array.append(dict_entities)
				

			new_collection = DBUtils().get_collection_obj(collection_name)
			new_collection.insert(data_array)

	return render_template('index_serve.html')

def format_line(line):
	open_tag_template = "<span class='label {{entity_type}}'>"
	list_entities = get_entities()
	# print list_entities
	for entity_type in list_entities:
		line = line.replace("<"+entity_type+">", open_tag_template.replace("{{entity_type}}", entity_type)).replace("</"+entity_type+">","</span>")
	return line

def get_entities():
	entity_columns = DBUtils().get_keys()
	columns_to_be_removed = ['_id', 'SUMMARY', 'ID']
	
	for key in entity_columns:
		if key.startswith("__"):
			columns_to_be_removed.append(key)

	for key in columns_to_be_removed:
		if key in entity_columns: entity_columns.remove(key)

	return entity_columns


## Returns list of tuples containing (read_count, doc_id, "__list_selection_color__")
@mod_data.route("/get-document-list")
def get_document_list():
	session_db = DBUtils().get_session_db()
	return json.dumps([{"count":document['__read_count'], "name":document['ID'], "color":""} for document in session_db.find({}, {'ID' : 1, '__read_count': 1})])

@mod_data.route("/get-document/<doc_id>")
def get_document(doc_id):
	session_db = DBUtils().get_session_db()
	session_db.update({'ID':doc_id},{'$inc':{'__read_count': 1}},upsert=False, multi=False)
	document_cursor = session_db.find_one({"ID":doc_id})

	entity_columns = document_cursor.keys()
	columns_to_be_removed = ['_id', 'SUMMARY', 'ID']
	
	for key in entity_columns:
		if key.startswith("__"):
			columns_to_be_removed.append(key)
	
	#['__formatted_content','__read_count','__content', '__word_frequency', '__entity_frequency', '__document_length','__subjectivity','__polarity']
	for key in columns_to_be_removed:
		if key in entity_columns: entity_columns.remove(key)

	return json.dumps({
		"summary": document_cursor["SUMMARY"], 
		"content": [format_line(content_line) for content_line in document_cursor["__formatted_content"]], 
		"entities": {column_name:document_cursor[column_name] for column_name in entity_columns}, 
		"entity_columns": entity_columns, 
		"id": document_cursor["ID"]
	})
