'use strict';
petSupplies.controller('LoginController', function LoginController($rootScope,
		$scope, $http, $location) {

	$scope.login = function() {
		console.log("inside login");
		if ($scope.serviceStarted && $scope.userId && $scope.password) {
			$http.get(
					$rootScope.webserviceuri + "/loginUser/" + $scope.userId
							+ "/" + $scope.password).success(function(data) {

				if (data) {
					createLoggedInUserObject(data);
					$location.path("/");
					console.log('success');
				} else {
					// populate the rootuser
					//console.log(data);
					console.log('failed');
				}

			}).error(function(data, status, headers, config) {
				console.log(status);
			});

		}
	};

	

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