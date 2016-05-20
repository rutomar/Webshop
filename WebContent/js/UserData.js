'use strict';

petSupplies.factory('UserData', function($resource) {
	var resource = $resource("createUser/", {});
	
	return {
		getUser : function(){
			return resource.get();
		},
		save : function(user){
			return resource.save(user);
		}
		
	}
});
