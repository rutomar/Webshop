'use strict';
var petSupplies = angular.module('petSupplies', [ 'ngRoute', 'ngResource' ]);

petSupplies.config(function($routeProvider, $locationProvider) {

	$routeProvider.when('/registerUser', {

		templateUrl : 'templates/userRegister.html',
		controller : 'AddUserController'

	}).when('/homePage', {

		redirectTo : 'index.html'
	}).when('/logout', {

		controller : 'HomePageController'
	});

	$locationProvider.html5Mode(true);

});
