function achCtrl($scope){
	$scope.hypotheses = [
		{
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
			$scope.hypothesis[pnnType].data.push(evidence.title);
		});
		// console.log(arguments);
	}
	$scope.removeEvidence = function(){
		console.log(arguments);
	}
}

angular
	.module('inspinia')
	.controller('achCtrl', achCtrl)
	.controller('hypothesisCtrl', hypothesisCtrl)