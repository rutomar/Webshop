'use strict';
petSupplies.controller('LoginController', function LoginController($rootScope,
		$scope, $http, $location) {

	$rootScope.cartTotal = 0;

	$scope.login = function() {
		console.log("inside login");
		if ($scope.serviceStarted && $scope.userId && $scope.password) {
			$http.get(
					$rootScope.webserviceuri + "/loginUser/" + $scope.userId
							+ "/" + $scope.password).success(function(data) {

				if (data) {
					createLoggedInUserObject(data);
					console.log('success');
					$location.path('/product');
					//getCartItems($scope.userId);

				} else {

					console.log('failed');
				}

			}).error(function(data, status, headers, config) {
				console.log(status);
			});

		}
	};

	/*var getCartItems = function(userId) {

		$http.get($rootScope.webserviceuri + '/cart/' + userId).success(
				function(data) {
					console.log(data);
					if (data) {
						$rootScope.cartItems = data;
					}
				}).error(function(data, status, headers, config) {
			console.log(status);
		});

	};
*/
	function createLoggedInUserObject(data) {
		$rootScope.activeUser = {
			userId : data.userId,
			userName : data.userName,
			password : data.password,
			address : {
				userId : data.address.userId,
				address : data.address.address,
				emailId : data.address.emailId,
				city : data.address.city
			}
		};
	}
});