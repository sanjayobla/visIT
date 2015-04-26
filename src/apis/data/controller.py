from flask import Blueprint, request, render_template, redirect, url_for, session
from ..utils import Utils as DBUtils
from ..db import DB as GraphDB

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
			data_array = []

			for input_file_name in glob.glob(destination_path+"/*.txt"):
				file_content = []
				no_of_entities = 0
				file_line_content = filter(None, [re.sub(r'[^\x00-\x7F]+',' ', line.rstrip('\n\r')).strip() for line in open(input_file_name, 'r')])

				for line in file_line_content:
					file_content.append(tagger.tag_text(line))

				document_id = GraphDB().create_document(os.path.basename(input_file_name), file_content, [], 0)

				for line in file_line_content:
					dict_line_entities = tagger.get_entities(line)

					for key, values in dict_line_entities.iteritems():
						for value in values:
							entity_id = GraphDB().create_entity(value, key)
							GraphDB().add_entity_to_doc(document_id, entity_id, "default")

			session['token'] = collection_name
			session.permanent = True

	return redirect("/")

def format_line(line):
	open_tag_template = "<span class='label {{entity_type}}'>"
	list_entities = get_entities()
	# print list_entities
	for entity_type in list_entities:
		line = line.replace("<"+entity_type+">", open_tag_template.replace("{{entity_type}}", entity_type)).replace("</"+entity_type+">","</span>")
	return line

def get_entities():
	return ["ORGANIZATION", "PERSON", "LOCATION", "DATE", "MONEY", "PERCENTAGE", "TIME"]
	# entity_columns = DBUtils().get_keys()
	# columns_to_be_removed = ['_id', 'SUMMARY', 'ID']
	
	# for key in entity_columns:
	# 	if key.startswith("__"):
	# 		columns_to_be_removed.append(key)

	# for key in columns_to_be_removed:
	# 	if key in entity_columns: entity_columns.remove(key)

	# return entity_columns


## Returns list of tuples containing (read_count, doc_id, "__list_selection_color__")
@mod_data.route("/get-document-list")
def get_document_list():
	return json.dumps(GraphDB().fetch_docs_list())

@mod_data.route("/get-document/<doc_id>")
def get_document(doc_id):
	document_content = GraphDB().fetch_doc_content(doc_id)
	document_content["content"] = [format_line(content_line) for content_line in document_content["content"]]
	# print document_content["content"], [format_line(content_line) for content_line in document_content["content"]]
	return json.dumps(document_content)
	# session_db = DBUtils().get_session_db()
	# session_db.update({'ID':doc_id},{'$inc':{'__read_count': 1}},upsert=False, multi=False)
	# document_cursor = session_db.find_one({"ID":doc_id})

	# entity_columns = document_cursor.keys()
	# columns_to_be_removed = ['_id', 'SUMMARY', 'ID']
	
	# for key in entity_columns:
	# 	if key.startswith("__"):
	# 		columns_to_be_removed.append(key)
	
	# #['__formatted_content','__read_count','__content', '__word_frequency', '__entity_frequency', '__document_length','__subjectivity','__polarity']
	# for key in columns_to_be_removed:
	# 	if key in entity_columns: entity_columns.remove(key)

	# return json.dumps({
	# 	"summary": document_cursor["SUMMARY"], 
	# 	"content": [format_line(content_line) for content_line in document_cursor["__formatted_content"]], 
	# 	"entities": {column_name:document_cursor[column_name] for column_name in entity_columns}, 
	# 	"entity_columns": entity_columns, 
	# 	"id": document_cursor["ID"]
	# })

@mod_data.route('/create-hypothesis', methods=["POST"])
def create_hypothesis():
	hypothesis_name = request.form.get('hypothesis', type=str)
	return GraphDB().create_hypothesis(hypothesis_name)

@mod_data.route('/get-all-hypothesis')
def get_all_hypothesis():
	return json.dumps(GraphDB().get_all_hypothesis())

@mod_data.route('/create-evidence', methods=["POST"])
def create_evidence():
	evidence_name = request.form.get("evidence", type=str)
	return GraphDB().create_evidence(evidence_name)

@mod_data.route("/get-all-evidences")
def get_all_evidences():
	return json.dumps(GraphDB().get_all_evidences())

@mod_data.route("/add-entity-to-evidence", methods=["POST"])
def add_entity_to_evidence():
	entity_id = request.form.get("entity_id", type=str)
	evidence_id = request.form.get("evidence_id", type=str)
	return json.dumps(GraphDB().add_entity_to_evidence(entity_id, evidence_id, "default"))

@mod_data.route("/add-entities-to-evidence", methods=["POST"])
def add_entities_to_evidence():
	evidence_id = request.form.get("evidence_id", type=str)
	entities = json.loads(request.form.get("entities"))
	for entity_id in entities:
		GraphDB().add_entity_to_evidence(entity_id, evidence_id, "default")
	return json.dumps([])

@mod_data.route('/add-evidence-to-hypothesis', methods=["POST"])
def add_evidence_to_hypothesis():
	evidence_id = request.form.get("evidence_id", type=str)
	hypothesis_id = request.form.get("hypothesis_id", type=str)
	rel_type = request.form.get("rel_type", type=str)
	rel_weight = 0
	if rel_type == "positive":
		rel_weight = 1
	elif rel_type == "negative":
		rel_weight = -1

	return json.dumps(GraphDB().add_evidence_to_hypothesis(evidence_id, hypothesis_id, rel_type, rel_weight))

@mod_data.route('/delete-evidence-from-hypothesis', methods=["POST"])
def remove_evidence_from_hypothesis():
	hypothesis_id = request.form.get("hypothesis_id", type=str)
	evidence = request.form.get("evidence", type=str)
	rel_type = request.form.get("rel_type", type=str)

	GraphDB().remove_evidence_from_hypothesis(evidence, hypothesis_id)
	return json.dumps([])

@mod_data.route('/delete-all-evidences')
def delete_all_evidences():
	GraphDB().delete_all_evidences()
	return json.dumps([])

@mod_data.route('/delete-all-hypotheses')
def delete_all_hypotheses():
	GraphDB().delete_all_hypotheses()
	return json.dumps([])

