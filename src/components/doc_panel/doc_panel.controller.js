function documentComponent(){
	var myDocumentComponent = {};
	myDocumentComponent.restrict = 'E';
	myDocumentComponent.templateUrl = 'components/doc_panel/doc-component.html';
	return myDocumentComponent;
}

angular
	.module('inspinia')
	.directive('documentComponent', documentComponent);