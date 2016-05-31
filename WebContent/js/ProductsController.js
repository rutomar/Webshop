'use strict';

petSupplies.controller('ProductsController', function($rootScope, $scope,
		$location, $http, $window) {

	var cartUri = $rootScope.webserviceuri + '/cart/';

	var productQuantity = 0;

	console.log('inside productsControler');

	$scope.addToCart = function(product) {

		if ($rootScope.activeUser) {
			console.log(data.createCartItem(product));
			console.log('active user true for ading to cart');

			productQuantity = 1;

			$http.post(cartUri, data.createCartItem(product)).success(
					function(data) {
						console.log(data);
						if (data) {
							$scope.message = "Product Added to Cart";
							console.log('userID '
									+ $rootScope.activeUser.userId)
							$scope.fetchAllItems($rootScope.activeUser.userId);
							$window.alert($scope.message);
						}

					}).error(function(data, status, headers, config) {
				console.log(status);
			});

		} else {
			alert('Kindly login to purchase.');
			$location.path('/login');
		}
	};

	$scope.fetchAllItems = function(userId) {

		$http.get(cartUri + userId).success(function(data) {
			console.log(data);
			if (data) {
				$rootScope.cartItems = data;
			}
		}).error(function(data, status, headers, config) {
			console.log(status);
		});

	};

	var data = {
		createCartItem : function(product) {
			return {
				userProdCode : $rootScope.activeUser.userId
						+ product.productCode,
				userId : $rootScope.activeUser.userId,
				productCode : product.productCode,
				productName : product.productName,
				productPrice : product.productPrice,
				quantity : productQuantity
			};
		}

	};

});