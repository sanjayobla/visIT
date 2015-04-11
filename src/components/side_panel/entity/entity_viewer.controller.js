'use strict';

function entityViewerCtrl($scope){
	$scope.radioModel = 'All';
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