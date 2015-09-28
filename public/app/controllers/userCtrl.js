angular.module('userCtrl', ['userService'])

// controller applied to user edit page
.controller('userEditController', function($routeParams, User) {

	var vm = this;

	// get the user data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	User.get($routeParams.user_id)
		.success(function(data) {
			vm.userData = data;
		});

});