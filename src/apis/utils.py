from src import app
from flask import session
from pymongo import MongoClient
from bson.code import Code
from bson.son import SON

###########################
#DB APIS

class Utils:
	def get_db(self):
		client = MongoClient()
		return client[app.config['MONGODB_SETTINGS']['DB']]

	def get_collection_obj(self,collection_name):
		db = self.get_db()
		return db[collection_name]

	def get_session_token(self):
		##For VDA Project..
		if 'token' not in session:
			session['token'] = 'dac6cee6b243c932d00f976ba0d9882f'
		return session['token']

	def get_session_db(self):
		return self.get_collection_obj(self.get_session_token())

	def get_session_key_db(self):
		return self.get_collection_obj(self.get_session_token()+"_keys")

	def get_session_word_freq_db(self):
		return self.get_collection_obj(self.get_session_token()+"_doc_word_frequency")

	def get_keys(self):
		return [document['_id'] for document in self.get_session_key_db().find({},{'_id': 1})]

	def generate_keys_table(self,collection_name):
		map = Code("function() { for (var key in this) { emit(key, null); } }")
		reduce = Code("function(key, stuff) { return null; }")
		self.get_collection_obj(collection_name).map_reduce(map, reduce,  out=SON([("replace", collection_name+"_keys"), ("db", app.config['MONGODB_SETTINGS']['DB'])]))

	def generate_doc_summary(self, collection_name, only_entities):
		mapper_code_template = "function(){ __entity_count_code __word_count_code }"
		mapper_code = mapper_code_template.replace("__entity_count_code", "this.__entity_frequency.forEach(function(item){ emit(item[0], item[1]); });")
			
		if only_entities:
			mapper_code = mapper_code.replace("__word_count_code","")
		else:
			mapper_code = mapper_code.replace("__word_count_code","this.__word_frequency.forEach(function(item){ emit(item[0], item[1]); });")

		map = Code(mapper_code)
		reduce = Code("function(key, values){ return Array.sum(values); }")
		self.get_collection_obj(collection_name).map_reduce(map, reduce, out=SON([("replace", collection_name+"_doc_word_frequency"), ("db", app.config['MONGODB_SETTINGS']['DB'])]))


###########################