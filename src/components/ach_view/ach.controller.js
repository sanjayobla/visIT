function achCtrl($scope){
	$scope.hypotheses = [
		{
			overallWeights: [5, 7, 3],
			data: {
				positive: {
				  data: ["Evidence 11", "Evidence 2"]
				},
				negative: {
				  data: ["Evidence 3", "Evidence 4"]
				},
				neutral: {
				  data: ["Evidence 5", "Evidence 6"]
				}
			}
		}
	]

	$scope.evidences = [
		{
			title:'Evidence 1 (110203.txt)',
			data: [{
				name:'Anand',
				type: 'label-success'
				}, {
				name: 'GT',
				type: 'label-info'
				},{
				name: '2011',
				type: 'label-warning'
			}]
		}
	];
}

function hypothesisCtrl($scope){
	// console.log($scope);
	// window.scope = $scope;
	// function pnnChanged(){
	// 	console.log('whoah');
	// }
	// $scope.$watch('hypothesis',pnnChanged, true);
	$scope.addEvidence = function(evidence, pnnType){
		// console.log($scope.evidences[+evidence]);
		$scope.$apply(function(){
			$scope.hypothesis.data[pnnType].data.push(evidence.title);
		});
		// console.log(arguments);
	}
	$scope.removeEvidence = function(d,i,type){
		console.log(arguments);
	}
}
function evidenceCtrl($scope){
	$scope.addToHypothesis = function(d,i){
		console.log("ADD TO HYPO", $scope.evidence, d);
	}
}

angular
	.module('inspinia')
	.controller('achCtrl', achCtrl)
	.controller('hypothesisCtrl', hypothesisCtrl)
	.controller('evidenceCtrl', evidenceCtrl)