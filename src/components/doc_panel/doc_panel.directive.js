angular.module('inspinia')
	.directive('documentView', function(){
		function DocumentViewController($scope, $window, DocumentDataFactory){
			loadRemoteData();

			//Private functions
			function loadRemoteData(){
				DocumentDataFactory.init();
			}
		}

		function link($scope, elements, attributes, controller){
			//Scripts to be added here..
		}

		return ({
			restrict: 'A',
			templateUrl: 'components/doc_panel/doc_view.html',
			controller: DocumentViewController,
			link: link
		});
	});