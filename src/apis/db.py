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
			document_content["entities"] = []
			document_content["entity_columns"] = []
			document_content["summary"] = []
		return document_content

	def get_all_evidences(self):
		graph = Graph()
		list_evidences = []

		for evidence in graph.find("Evidence"):
			print evidence
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
			list_hypothesis.append({
				"title": hypothesis['name'], "id": hypothesis._id, "count": 0,
				"overallWeights" : [],
				"data": {
					"positive": {
					  "data": []
					},
					"negative": {
					  "data": []
					},
					"neutral": {
					  "data": []
					}
				}
			})
		return list_hypothesis

	def create_hypothesis(self, hypothesis_name):
		#TODO: Dont allow empty hypothesis names..
		graph = Graph()
		hypothesis_node = graph.find_one("Hypothesis", property_key="name", property_value=hypothesis_name)
		if (hypothesis_node == None):
			hypothesis_node = Node("Hypothesis", name=hypothesis_name)
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
		graph = Graph()
		evidence_node = graph.node(evidence_id)
		hypothesis_node = graph.node(hypothesis_id)
		link_obj = Relationship(hypothesis_node, "EVIHYP", evidence_node, type = rel_type, weight = rel_weight)
		graph.create(link_obj)
		return str(link_obj._id)

