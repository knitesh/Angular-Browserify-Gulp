require('angular');
require('angular-ui-router');

angular.module('ngBroswerifyApp.about.router',[])
.config(function($stateProvider, $urlRouterProvider) {	
	
	$stateProvider
	.state('about', {
		url: "/about",
		views : {
			"" : {
				templateUrl:"app/components/about/about.html"
			},
			"header@about":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	});
});