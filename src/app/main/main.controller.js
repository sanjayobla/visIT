'use strict';

angular.module('inspinia')
	.controller('MainCtrl', function ($scope) {
        this.userName = 'Example user';
        this.helloText = 'Welcome in INSPINIA Gulp SeedProject';
        this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

        $scope.tabUrl = 'app/side_panel/hypotheses/hypotheses_browser.html'
    });
