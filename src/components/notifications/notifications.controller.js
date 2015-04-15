'use strict';

function notificationsCtrl($rootScope, $scope, NotificationsFactory){
	$scope.notifications = NotificationsFactory.getData();
}

angular
	.module('inspinia')
	.controller('notificationsCtrl', notificationsCtrl)