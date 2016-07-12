require('angular');
require('angular-ui-router');

angular.module('ngBroswerifyApp.home.router',[])
.config(function($stateProvider, $urlRouterProvider) {
    
	$stateProvider
	.state('home', {
		url: "/home",
		views : {
			"" : {
				templateUrl:"app/components/home/home.html",
				controller: 'homeCtrl as home'
			},
			"header@home":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	});
});