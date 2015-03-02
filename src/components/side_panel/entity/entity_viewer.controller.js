'use strict';

function entityViewerCtrl($scope){
	$scope.radioModel = 'Selected';
	$scope.information = [
		'----------',
		'----------',
		'----------'
	];

	$scope.groups = [
		'----------',
		'----------',
		'----------'
	]
}

angular
	.module('inspinia')
	.controller('entityViewerCtrl', entityViewerCtrl)