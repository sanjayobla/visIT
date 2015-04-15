'use strict';

function notificationsCtrl($rootScope, $scope, NotificationsFactory){
	$scope.notifications = NotificationsFactory.getData();
	$scope.count = $scope.notifications.length;
	$scope.clearNotification = function(index){
		NotificationsFactory.removeAt(index);
		$scope.count--;
	}

	$rootScope.$on('notification:added', function(event, n){
		$scope.notifications = NotificationsFactory.getData();
		$scope.count = $scope.notifications.length;
	});
}

angular
	.module('inspinia')
	.controller('notificationsCtrl', notificationsCtrl)