'use strict';

petSupplies.controller('ProductsController', function($rootScope, $scope,
		$location, $http) {

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
						}

					}).error(function(data, status, headers, config) {
				console.log(status);
			});

			console.log($rootScope.cart + 'Items Added to the cart');

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

	// $scope.fetchAllItems($rootScope.activeUser.userId);

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