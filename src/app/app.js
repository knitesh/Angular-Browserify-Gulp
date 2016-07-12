require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('./components/home/home.js');
require('./components/about/about.js');


var configFunction = function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/about");		
};

angular.module('ngBroswerifyApp', [	'ui.router',
									'ngMaterial',
									'ngBroswerifyApp.home',
									'ngBroswerifyApp.about'
									])
									.config(configFunction);