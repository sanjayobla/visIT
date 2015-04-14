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

function hypothesisCtrl($rootScope, $scope, HypothesesFactory){
	$scope.inSearch = 0;
	$rootScope.$on('globalSearch:active', function(evt, results){
		if(results.length === 0) {
			$scope.inSearch = 0;
		}
		else{
			$scope.inSearch = _.findIndex(results, function(data) {
			  return $scope.hypothesis.title == data.title;
			});
			if($scope.inSearch === -1){
				var resultTitles = _.pluck(results, 'title');
				var intersectionP = _.intersection(resultTitles, $scope.hypothesis.data.positive.data);
				var intersectionN = _.intersection(resultTitles, $scope.hypothesis.data.neutral.data);
				var intersectionNE = _.intersection(resultTitles, $scope.hypothesis.data.negative.data);

				if(intersectionP.length > 0 || intersectionN.length > 0 || intersectionNE.length > 0){
					$scope.inSearch = 0;
				}
			}
		}
	});
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
function evidenceCtrl($rootScope, $scope, EvidencesFactory){
	$scope.inSearch = 0;
	$rootScope.$on('globalSearch:active', function(evt, results){
		console.log(results);
		if(results.length === 0) {
			$scope.inSearch = 0;
		}
		else{
			$scope.inSearch = _.findIndex(results, function(data) {
			  return $scope.evidence.title == data.title;
			});
			if($scope.inSearch === -1){
				var resultTitles = _.pluck(results, 'title');
				var entityNames = _.pluck($scope.evidence.data, 'name');
				var intersection = _.intersection(resultTitles, entityNames);
				if(intersection.length > 0) $scope.inSearch = 0;
			}
		}
		// console.log('found', found);
	});
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