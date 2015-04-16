function achParentCtrl($scope, $rootScope, HypothesesFactory, EvidencesFactory, EntityFactory){
	$scope.objectName = "";
	
	$scope.resetZoom = function(){
		scroller.zoomTo(1.0, true);
	}
	$scope.zoomIn = function(){
		scroller.zoomBy(1.2, true);
	}
	$scope.zoomOut = function(){
		scroller.zoomBy(0.8, true);
	}
	function noName(){
		return !$scope.objectName;
	}

	$scope.addEvidenceBox = function(){
		if (noName()) return;
		// console.log("ADD Evidence Box");
		var args = {
			title:$scope.objectName,
			count: 0,
			data: [/*{
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
			}*/]
		}
		EvidencesFactory.addData(args);
		$scope.objectName = "";
		// $rootScope.$emit('addEvidenceBox', args);
	}
	$scope.addHypothesisBox = function(){
		if (noName()) return;
		// console.log("ADD Hypothesis Box");
		var args = {
			title: $scope.objectName,
			overallWeights: [0, 0, 0],
			count: 0,
			data: {
				positive: {
				  data: []
				},
				negative: {
				  data: []
				},
				neutral: {
				  data: []
				}
			}
		}
		HypothesesFactory.addData(args);
		$scope.objectName = "";
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
		$scope.objectName = "";
		// $rootScope.$emit('addHypothesisBox', args);
	}
}

angular
	.module('inspinia')
	.controller('achParentCtrl', achParentCtrl)