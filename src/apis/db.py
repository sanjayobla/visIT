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