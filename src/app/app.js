'use strict';

angular.module('inspinia', ['ngAnimate', 
    'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui.tree', 'isteven-multi-select', 'angularChart',
    'sf.virtualScroll','pasvaz.bindonce'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "components/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "app/main/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "app/minor/minor.html",
            data: { pageTitle: 'Example view' }
        })

    $urlRouterProvider.otherwise('/index/main');
  })
;
