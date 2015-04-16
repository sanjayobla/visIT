# -*- coding: utf-8 -*-
from __future__ import division
from py2neo import Graph, Path, Node, Relationship, neo4j

class DB:
	def create_entity(self, entity_name, entity_type):
		graph = Graph()
		entity_node = graph.find_one("Entity", property_key="name", property_value=entity_name)
		if (entity_node == None):
			entity_node = Node("Entity", name=entity_name, type=entity_type)
			graph.create(entity_node)
		return str(entity_node._id)

	def create_document(self, document_name, document_text, document_summary, document_rcount):
		graph = Graph()
		document_node = graph.find_one("Document", property_key="name", property_value=document_name)
		if (document_node == None):
			document_node = Node("Document", name=document_name, text = document_text, summary = document_summary, rcount = document_rcount)
			graph.create(document_node)
		return str(document_node._id)

	def add_entity_to_doc(self, document_id, entity_id, rel_type):
		graph = Graph()
		document_node = graph.node(document_id)
		entity_node = graph.node(entity_id)
		link_obj = Relationship(document_node, "ENTDOC", entity_node, type = rel_type)
		graph.create(link_obj)
		return str(link_obj._id)

	def fetch_docs_list(self):
		graph = Graph()
		return [{"name": record["name"], "count": record["rcount"], "color":""} for record in graph.find("Document")]


	def fetch_doc_content(self, document_id):
		#TODO: Add API's to fetch the entities along with the contents..
		graph = Graph()
		document_content = {}
		document_node = graph.find_one("Document", property_key="name", property_value=document_id)
		if (document_node != None):
			document_content["id"] = document_node["name"]
			document_content["content"] = document_node["text"]
			document_content["summary"] = []

			entities_dict = {}
			entity_columns = []
			entity_node_list = []
			entity_index = 0

			for entity in graph.cypher.execute("MATCH (d:Document)--(e:Entity) where id(d)= "+`document_node._id`+" return distinct(e)"):
				entity_type = entity[0]['type']
				if entity_type not in entities_dict:
					entity_columns.append(entity_type)
					entities_dict[entity_type] = []
				entities_dict[entity_type].append(entity[0]['name'])

				entity_node_list.append({
					"name":  entity[0]['name'], "category": entity[0]['type'], "type": entity[0]['type'], 
					"id": entity[0]._id, "loc": entity_index
				})
				entity_index += 1

			document_content["entities"] = entities_dict
			document_content["entity_columns"] = entity_columns
			document_content["entity_node_list"] = entity_node_list
				
		return document_content


	def get_all_evidences(self):
		graph = Graph()
		list_evidences = []

		for evidence in graph.find("Evidence"):
			entity_list = []

			for entity in graph.cypher.execute("MATCH(n:Evidence)--(e:Entity) where id(n) = "+`evidence._id`+" return e"):
				entity_list.append({
					"name": entity[0]['name'], "type": entity[0]['type'], "category": entity[0]['type']
				})

			list_evidences.append({
				"title": evidence['name'], "id": evidence._id, "count": len(entity_list),
				"data": entity_list
			})
		return list_evidences

	def create_evidence(self, evidence_name):
		#TODO: Associating a document with an evidence file..
		graph = Graph()
		evidence_node = graph.find_one("Evidence", property_key="name", property_value=evidence_name)
		if (evidence_node == None):
			evidence_node = Node("Evidence", name=evidence_name)
			graph.create(evidence_node)
		return str(evidence_node._id)

	def get_all_hypothesis(self):
		graph = Graph()
		list_hypothesis = []
		for hypothesis in graph.find("Hypothesis"):
			
			positive_data = []
			negative_data = []
			neutral_data = []

			# print hypothesis._id

			for record in graph.cypher.execute("MATCH (h:Hypothesis)-[r]-(e:Evidence) where id(h)="+`hypothesis._id`+" return e, r.type, r.weight"):
				# print record[0], record[1], record[2]
				if record[1] == "positive":
					positive_data.append(record[0]['name'])
				elif record[1] == "negative":
					negative_data.append(record[0]['name'])
				else:
					neutral_data.append(record[0]['name'])

			list_hypothesis.append({
				"title": hypothesis['name'], "id": hypothesis._id, "count": len(positive_data) - len(negative_data),
				"overallWeights": [len(positive_data), len(negative_data), len(neutral_data)],
				"threshold": hypothesis["threshold"],
				"data": {
					"positive": {
						"data": positive_data
					},
					"negative": {
						"data": negative_data
					},
					"neutral": {
						"data": neutral_data
					}
				}	
			});
		return list_hypothesis

	def create_hypothesis(self, hypothesis_name):
		#TODO: Dont allow empty hypothesis names..
		graph = Graph()
		hypothesis_node = graph.find_one("Hypothesis", property_key="name", property_value=hypothesis_name)
		if (hypothesis_node == None):
			hypothesis_node = Node("Hypothesis", name=hypothesis_name, threshold=10)
			graph.create(hypothesis_node)
		return str(hypothesis_node._id)

	def add_entity_to_evidence(self, entity_id, evidence_id, rel_type):
		graph = Graph()
		evidence_node = graph.node(evidence_id)
		entity_node = graph.node(entity_id)
		link_obj = Relationship(evidence_node, "ENTEVI", entity_node, type = rel_type)
		graph.create(link_obj)
		return str(link_obj._id)

	def add_evidence_to_hypothesis(self, evidence_id, hypothesis_id, rel_type, rel_weight):
		##TODO: Change the count..
		##TODO: Change the weight array..
		graph = Graph()
		evidence_node = graph.node(evidence_id)
		hypothesis_node = graph.node(hypothesis_id)
		link_obj = Relationship(hypothesis_node, "EVIHYP", evidence_node, type = rel_type, weight = rel_weight)
		graph.create(link_obj)
		return str(link_obj._id)

	def remove_evidence_from_hypothesis(self, evidence, hypothesis_id):
		graph = Graph()
		graph.cypher.execute("MATCH (h:Hypothesis)-[r]-(e:Evidence) where id(h)="+hypothesis_id+" and e.name=\""+evidence+"\" delete r")

	def retrieve_list_entities(self):
		graph = Graph()

		# for record in graph.cypher.execute("match (n:Entity) return n"):
		# 	print record
		entities_list = []
		
		all_list_items = []
		all_entities_list = []
		all_max_count = -1

		for entity_type in graph.cypher.execute("MATCH(ent:Entity) return distinct(ent.type)"):
			entity_list_items = []
			list_items = []

			#(e:Evidence)-[m]- ++ , count(distinct e)
			max_count  = -1
			for entity_info in graph.cypher.execute("match (n:Entity)-[r]-(d:Document) where n.type='"+entity_type[0]+"' return n.name, id(n), count(distinct d)"):
				entity_count = int(entity_info[2])
				
				if max_count < entity_count:
					max_count = entity_count
					
					if all_max_count < entity_count:
						all_max_count = entity_count

				entity_list_items.append({
					"count": int(entity_info[2]),
					"name": entity_info[0],
					"id": entity_info[1],
					"type": entity_type[0],
					"strength": 0,
					"hasStrength": 0,
					"strengthCount": 0
				})

				all_list_items.append({
					"count": int(entity_info[2]),
					"name": entity_info[0],
					"id": entity_info[1],
					"type": entity_type[0],
					"strength": 0,
					"hasStrength": 0,
					"strengthCount": 0
				})
			
			for entity_info in entity_list_items:
				entity_info["frequency"] = entity_info["count"]/max_count
				list_items.append(entity_info);

			entities_list.append({
				"key": entity_type[0],
				"values": list_items
			});

		for all_entity in all_list_items:
			all_entity['frequency'] = all_entity['count']/all_max_count
			all_entities_list.append(all_entity)

		entities_list.append({
			"key": "ALL",
			"values": all_entities_list
		});

		return entities_list

	# def retrieve_entity_dist(self):
	# 	graph = Graph()
	# 	result_json = []
	# 	max_count = 0
	# 	for record in graph.cypher.execute("Match(ent:Entity) return distinct(ent.type)"):
	# 		if(record[0]!=''):
	# 			entity_record = {}
	# 			entity_record["entity_type"] = record[0]
	# 			for doc_count in graph.cypher.execute("MATCH(doc:Document)--(ent:Entity) WHERE ent.type = '"+record[0]+"' return count(distinct doc)"):
	# 				entity_record["doc_count"] = doc_count[0]
	# 			for evid_count in graph.cypher.execute("MATCH(evid:Evidence)--(ent:Entity) WHERE ent.type = '"+record[0]+"' return count(distinct evid)"):
	# 				entity_record["evid_count"] = evid_count[0]
	# 			entity_record["total_count"] = int(entity_record["doc_count"]) + int(entity_record["evid_count"])
	# 			if int(entity_record["total_count"]) > max_count:
	# 				max_count = entity_record["total_count"]
	# 			result_json.append(entity_record)
	# 	for record in result_json:
	# 		record["norm_count"] = record["total_count"]/max_count
		
	# 	return result_json

