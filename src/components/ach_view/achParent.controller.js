function achParentCtrl($scope, $rootScope, HypothesesFactory, EvidencesFactory, EntityFactory){
	$scope.objectName = "";
	
	function noName(){
		return !$scope.objectName;
	}

	$scope.addEvidenceBox = function(){
		if (noName()) return;
		console.log("ADD Evidence Box");
		var args = {
			title:$scope.objectName,
			data: [{
				name:'Pranav',
				category: 'Name',
				type: 'label-success'
				}, {
				name: 'India',
				category: 'Location',
				type: 'label-info'
				},{
				name: '2015',
				category: 'Date',
				type: 'label-warning'
			}]
		}
		EvidencesFactory.addData(args);
		// $rootScope.$emit('addEvidenceBox', args);
	}
	$scope.addHypothesisBox = function(){
		if (noName()) return;
		console.log("ADD Hypothesis Box");
		var args = {
			title: $scope.objectName,
			overallWeights: [15, 7, 3],
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
		HypothesesFactory.addData(args);
		// $rootScope.$emit('addHypothesisBox', args);
	}

	$scope.addEntity = function(){
		if (noName()) return;
		console.log("ADD Entity");
		var args = {
		name: $scope.objectName,
		type: 'label-danger'
	}
		EntityFactory.addData(args);
		// $rootScope.$emit('addHypothesisBox', args);
	}
}

angular
	.module('inspinia')
	.controller('achParentCtrl', achParentCtrl)