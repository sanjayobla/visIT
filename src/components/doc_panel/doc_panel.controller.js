angular
	.module('inspinia')
	.filter("sanitize", ['$sce', function($sce) {
		return function(htmlCode){
		  return $sce.trustAsHtml(htmlCode);
		}
	}])
	.controller('DocumentController', function($scope, $window, $filter, DocumentDataFactory, $sce){

		/** Global configurable variables **/
		var currentSelection = "#FEF935";
		$scope.documentList = [];
		$scope.orderByPredicate = "-count"; //can be one of name, date or count

		$scope.document_id = "";
		$scope.entities = {};
		$scope.content = [];
		$scope.summary = [];
		$scope.entity_columns = [];
		$scope.entity_node_list = [];

		/** Callbacks for the various data change events.. **/

		$scope.$on('documentListLoaded', function(){
			$scope.documentList = DocumentDataFactory.getDocumentList();
		});

		$scope.$on('documentContentLoaded', function(){
			var documentJSON = DocumentDataFactory.getDocumentContent();
			$scope.summary = documentJSON['summary'];
			$scope.content = documentJSON['content'];
			$scope.entities = documentJSON['entities'];
			$scope.entity_columns = documentJSON['entity_columns'];
			$scope.entity_node_list = documentJSON['entity_node_list'];
			$scope.document_id = documentJSON['id'];
		});


		/** Click Events on the DOM elements **/
		$scope.addEntities = function(add_as_evidence_flag){
			console.log("Add entities button clicked with the flag", add_as_evidence_flag);
			console.log($scope.entity_node_list);
			$scope.$emit("appendEntities", $scope.entity_node_list);
		}

		$scope.loadDocument = function(doc_id){
			var previous_doc_id = $scope.document_id;
			DocumentDataFactory.fetchDocument(doc_id);
			var no_of_updates = 0;

			for (var len = $scope.documentList.length, i=0; i<len && no_of_updates < 2; ++i) {
				if($scope.documentList[i].name === doc_id){
					$scope.documentList[i].count += 1;
					$scope.documentList[i].color = currentSelection;
					no_of_updates += 1;
				}

				if($scope.documentList[i].name === previous_doc_id){
					$scope.documentList[i].color = "";
					no_of_updates += 1;
				}
			}
		}

	});