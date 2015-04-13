function achCtrl($scope, $rootScope, HypothesesFactory, EvidencesFactory, EntityFactory){
	console.log(HypothesesFactory)
	$scope.hypotheses = HypothesesFactory.getData();
	// window.scope = $scope;
	$scope.evidences = EvidencesFactory.getData();
	$scope.entities = EntityFactory.getData();
	/*$rootScope.$on('addEvidenceBox', function(event, args) {
		console.log('received evidence')
		$scope.evidences.push(args);
	});*/
	/*$rootScope.$on('addHypothesisBox', function(event, args) {
		console.log('received hypothesis')
		// $scope.hypotheses = data;
	});*/
}

function hypothesisCtrl($scope, HypothesesFactory){
	// console.log($scope);
	// window.scope = $scope;
	// function pnnChanged(){
	// 	console.log('whoah');
	// }
	// $scope.$watch('hypothesis',pnnChanged, true);
	$scope.addEvidence = function(evidence, pnnType){
		// console.log($scope.evidences[+evidence]);
		$scope.$apply(function(){
			HypothesesFactory.addEvidenceTo($scope.hypothesis, evidence, pnnType);
			// $scope.hypothesis.data[pnnType].data.push(evidence.title);
		});
		// console.log(arguments);
	}
	$scope.removeEvidence = function(d,i,type){
		$scope.$apply(function(){
			HypothesesFactory.removeEvidenceFrom($scope.hypothesis, d, type);
		});
	}
}
function evidenceCtrl($scope, EvidencesFactory){
	$scope.addToHypothesis = function(d,i){
		console.log("ADD TO HYPO", $scope.evidence, d);
	}
	$scope.addEntity = function(data){
		$scope.$apply(function(){
			// $scope.evidence.data.push(data);
			EvidencesFactory.addEntityTo($scope.evidence, data);
			// console.log($scope.evidences);
		});
	}
}

angular
	.module('inspinia')
	.controller('achCtrl', achCtrl)
	.controller('hypothesisCtrl', hypothesisCtrl)
	.controller('evidenceCtrl', evidenceCtrl)