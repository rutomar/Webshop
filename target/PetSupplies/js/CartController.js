'use strict';

petSupplies.controller('CartController', function($rootScope, $scope,
		$location, $http) {

	
	var cartUri = $rootScope.webserviceuri + '/cart/';

	
	$scope.removeFromCart = function(userProdCode) {
		$http.delete(cartUri + userProdCode).success(function(data) {
			
			if (data) {
				console.log('removing product ' + userProdCode);
				fetchAllItems();
			}
		}).error(function(data, status, headers, config) {
			console.log(status);
		});
		
			
	};

	$scope.updateCart = function(cartItems) {
		for (var i = 0; i < cartItems.length; i++) {
		
			var product = cartItems[i];

			$http.put(cartUri, data.createCartItem(product)).success(function(data) {
				console.log('updating cart ' + product);
				if (data) {
					console.log('updated cart ' + data);
				}
			}).error(function(data, status, headers, config) {
				console.log(status);
			});

		}

		fetchAllItems();

	};
	
	
	
	var fetchAllItems = function() {

		$http.get(cartUri + $rootScope.activeUser.userId).success(
				function(data) {
					console.log(data);
					if (data) {
						$rootScope.cartItems = data;
						$rootScope.cartTotal = 0;
						for (var i = 0; i < $rootScope.cartItems.length; i++) {
				
							var product = $rootScope.cartItems[i];
							$rootScope.cartTotal = $rootScope.cartTotal + (product.productPrice * product.quantity);
				
						}

					}
				}).error(function(data, status, headers, config) {
			console.log(status);
		});

	};

	
	fetchAllItems();
	
	
	var data = {
			createCartItem : function(product) {
				return {
					userProdCode : product.userProdCode,
					userId : product.userId,
					productCode : product.productCode,
					productName : product.productName,
					productPrice : product.productPrice,
					quantity : product.quantity
				};
			}

		};
	
	$scope.checkout = function(cartItems){
		
		console.log("proceeding to checkout");
		$location.path('/checkout');
		
	};

});