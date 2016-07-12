
require('./home.router.js');

'use strict';

angular.module('ngBroswerifyApp.home', ['ngBroswerifyApp.home.router']).controller('homeCtrl',homeCtrl);

homeCtrl.$inject =[];

function homeCtrl(){
	this.welcomeText = 'Welcome to Home! Download and run npm install && gulp';
};

