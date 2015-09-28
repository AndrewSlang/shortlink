angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})
		
		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    		controllerAs: 'login'
		})
		
		// show all links
		.when('/links', {
			templateUrl: 'app/views/pages/links/all.html',
			controller: 'linkController',
			controllerAs: 'link'
		})

		// show links by tag
		.when('/tag/:tagname', {
			templateUrl: 'app/views/pages/links/tags.html',
			controller: 'linksByTagController',
			controllerAs: 'link'
		})

		// show info link
		.when('/info/:short_link', {
			templateUrl: 'app/views/pages/links/info.html',
			controller: 'infoController',
			controllerAs: 'link'
		})

		.when('/redirect/:short_link', {
			templateUrl: 'app/views/pages/links/redirect.html',
			controller: 'redirectController',
			controllerAs: 'redirect'
		})

		// form to create a new user
		// same view as edit page
		.when('/link/create', {
			templateUrl: 'app/views/pages/links/create.html',
			controller: 'linkCreateController',
			controllerAs: 'link'
		})

		.when('/links/:short_link', {
			templateUrl: 'app/views/pages/links/update.html',
			controller: 'linkUpdateController',
			controllerAs: 'link'
		})

		.when('/signup', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})


	$locationProvider.html5Mode(true);

});
