'use strict';

petSupplies.controller('LogoutController', function($rootScope, $scope,
		$location, $window) {

	var destroyRootScope = function() {

		console.log('destroying rootScope');
		$rootScope.activeUser = null;
		$rootScope.cartItems = null;
		$rootScope.userOrders = null;
		// $rootScope.$destroy();
		$window.alert('User logged out successfully!');
		$location.path('/product');
	};

	destroyRootScope();
});