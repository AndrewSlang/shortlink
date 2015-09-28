angular.module('linkCtrl', ['linkService'])

// controller applied to links by user
.controller('linkController', function(Link) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all links by define user
	Link.byUser()
		.success(function(data) {

			// when all the links come back, remove the processing variable
			vm.processing = false;

			// bind the links that come back to vm.links
			vm.links = data;
		});
})

// controller applied to links by tag
.controller('linksByTagController', function($routeParams, Link) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all links by tag
	Link.byTag($routeParams.tagname)
		.success(function(data) {

			// when all the links come back, remove the processing variable
			vm.processing = false;

			// bind the links that come back to vm.links
			vm.links = data;
			vm.tagname = $routeParams.tagname;
		});
})

// controller applied info the link
.controller('infoController', function($routeParams, Link) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all links by define user
	Link.info($routeParams.short_link)
		.success(function(data) {

			// when all the links come back, remove the processing variable
			vm.processing = false;

			// bind the links that come back to vm.links
			vm.links = data;
		});
})

// create short link
.controller('linkCreateController', function(Link) {
	
	var vm = this;

	vm.regular = /(https?:\/\/)?(www\.)?([-а-яa-zёЁцушщхъфырэчстью0-9_\.]{2,}\.)(рф|[a-z]{2,6})((\/[-а-яёЁцушщхъфырэчстьюa-z0-9_]{1,})?\/?([a-z0-9_-]{2,}\.[a-z]{2,6})?(\?[a-z0-9_]{2,}=[-0-9]{1,})?((\&[a-z0-9_]{2,}=[-0-9]{1,}){1,})?)/i;

	// function to create a user
	vm.createLink = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the linkService
		Link.create(vm.linkData)
			.success(function(data) {
				vm.processing = false;
				vm.linkData = {};
				vm.message = data.message;
			});
			
	};	

})

// create short link
.controller('linkUpdateController', function($routeParams, Link) {
	
	var vm = this;

	Link.info($routeParams.short_link)
		.success(function(data) {
			if (data.tags.length) {
				vm.linkData = data;
				vm.linkTags = data.tags.toString();
				vm.linkTags = vm.linkTags.replace(/,/g, '; ') + ';';
				var i = 0;
				for (i; vm.linkData.tags.length; i++) {
					vm.linkData.tags.pop();
				}
				vm.linkData.tags.push(vm.linkTags);
			} else vm.linkData = data;
		});

	// function to update a link
	vm.updateLink = function() {
		vm.processing = true;
		vm.message = '';

		// use the update function in the linkService
		Link.update($routeParams.short_link, vm.linkData)
			.success(function(data) {
				vm.processing = false;
				//vm.linkData = {};
				vm.message = data.message;
			});
			
	};
})

// redirect controller
.controller('redirectController', function($routeParams, $window, Link) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all links by define user
	Link.redirect($routeParams.short_link)
		.success(function(data) {

			// when all the links come back, remove the processing variable
			vm.processing = false;

			if (data.success === false) {
				vm.message = 'No links!';
			} else {
				// bind the links that come back to vm.links
				vm.links = data;

				vm.message = 'Redirect on ' + vm.links.linkname;

				$window.location.href='http://' + vm.links.linkname;
			}
		});
});
