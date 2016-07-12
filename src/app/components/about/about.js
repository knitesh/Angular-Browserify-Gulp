
require('./about.router.js');


angular.module('ngBroswerifyApp.about', ['ngBroswerifyApp.about.router'])
.controller('aboutCtrl',aboutCtrl);


aboutCtrl.$inject = [];

function aboutCtrl(){
	this.aboutText = 'A starter template developed for AngularJS + Browserify and Gulp Based Applicaiton!';
};