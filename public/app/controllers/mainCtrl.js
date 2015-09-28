angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth, Link) {

	var vm = this;

	// grab all links by define user
	Link.all()
		.success(function(data) {

			// when all the links come back, remove the processing variable
			vm.processing = false;

			// bind the links that come back to vm.links
			vm.links = data;
		});

	// get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check to see if a user is logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();	

		// get user information on page load
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});	
	});	

	// function to handle login form
	vm.doLogin = function() {
		vm.processing = true;

		// clear the error
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;			

				// if a user successfully logs in, redirect to users page
				if (data.success)			
					$location.path('/links');
				else 
					vm.error = data.message;
				
			});
	};

	// function to handle logging out
	vm.doLogout = function() {
		Auth.logout();
		vm.user = '';
		
		$location.path('/');
	};

	//vm.createSample = function() {
	//	Auth.createSampleUser();
	//};

})

// controller applied to user creation page
.controller('userCreateController', function(Auth) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';
		vm.btnLogin = false;

		// use the create function in the userService
		Auth.create(vm.userData)
			.success(function(data) {
				vm.processing = false;
				vm.userData = {};
				vm.message = data.message;
				vm.btnLogin = true;
			});
			
	};	

});
