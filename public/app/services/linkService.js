angular.module('linkService', [])

.factory('Link', function($http) {

	// create a new object
	var linkFactory = {};

	// get all links
	linkFactory.all = function() {
		return $http.get('/info/');
	};

	// get info the link
	linkFactory.info = function(short_link) {
		return $http.get('/info/json/' + short_link);
	};

	// get all links by user
	linkFactory.byUser = function() {
		return $http.get('/api/links/');
	};

	// get links by tag
	linkFactory.byTag = function(tag) {
		return $http.get('/tag/json/' + tag);
	};

	// redirect
	linkFactory.redirect = function(short_link) {
		return $http.get('/redirect/json/' + short_link);
	};
	
	// create a link
	linkFactory.create = function(linkData) {
		return $http.post('/api/links/', linkData);
	};

	// update a link
	linkFactory.update = function(short_link, linkData) {
		return $http.put('/api/links/' + short_link, linkData);
	};
	
	return linkFactory;
});