'use strict';

petSupplies.controller('CheckoutController', function($rootScope, $scope,
		$location, $http) {
	var calculateTotalOrderAmount = function() {

		$rootScope.cartTotal = 0;
		for (var i = 0; i < $rootScope.cartItems.length; i++) {
			var product = $rootScope.cartItems[i];
			$rootScope.cartTotal = $rootScope.cartTotal
					+ (product.productPrice * product.quantity);
		}

	};

	calculateTotalOrderAmount();
});