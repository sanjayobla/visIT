angular.module('inspinia')
	.factory('DocumentDataFactory', function($rootScope, DocumentAPIService){
		
		var documentList = [];
		var currentSelection = "#FEF935";
		var documentContentJSON = {};

		var service = {};

		service.init = function(){
			DocumentAPIService.fetchDocumentList()
				.then(function(list){
					documentList = list;
					documentList[0].count += 1;
					documentList[0].color = currentSelection;

					$rootScope.$broadcast('documentListLoaded');

					DocumentAPIService.fetchDocumentContent(documentList[0].name)
						.then(function(content){
							documentContentJSON = content;
							$rootScope.$broadcast('documentContentLoaded');
						});
				})
		}

		service.fetchDocument = function(doc_id){
			DocumentAPIService.fetchDocumentContent(doc_id)
				.then(function(content){
					documentContentJSON = content;
					$rootScope.$broadcast('documentContentLoaded');
				});
		}

		service.getDocumentList = function(){
			return documentList;
		}

		service.getDocumentContent = function(){
			return documentContentJSON;
		}

		return service;
	});