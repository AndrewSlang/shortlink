var bodyParser = require('body-parser');
var User       = require('../models/user');
var Links      = require('../models/links');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var lib		   = require('../library/lib');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// route to authenticate a user (POST http://localhost:8080/api/login)
	apiRouter.post('/login', function(req, res) {

	  // find the user
	  User.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {

	    if (err) throw err;

	    // no user with that username was found
	    if (!user) {
	      res.json({ 
	      	success: false, 
	      	message: 'Authentication failed. User not found.' 
	    	});
	    } else if (user) {

	      // check if password matches
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: 'Authentication failed. Wrong password.' 
	      	});
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, superSecret, {
	          expiresInMinutes: 1440 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});

	apiRouter.route('/signup')

		// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
			
			var user = new User();		// create a new instance of the User model
			user.name = req.body.name;  // set the users name (comes from the request)
			user.username = req.body.username;  // set the users username (comes from the request)
			user.password = req.body.password;  // set the users password (comes from the request)

			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'User created!' });
			});

		});

	// route middleware to verify a token
	apiRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	});  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	    
	  }
	});

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	apiRouter.route('/links')

		//Get all links
		.get(function(req, res) {
			User.find({username:req.decoded.username})
				.populate('links')
				.select('-_id links')
				.sort('-_id')
				.exec(function (err, user) {
					if (err) return res.send(err);
					res.json(user[0].links);
				})
		})

		.post(function(req, res) {
			User.findOne({username:req.decoded.username}).populate('links').exec(function (err, user) {
				
				if (req.body.tags) {
					tagname = lib.toSplitTags(req.body.tags);
				} else tagname = [];

				var link = new Links({
					    linkname : req.body.linkname,
						shortlinkname : lib.toShort(),
						description : req.body.description,
						hits: 0,
						tags: tagname
					    //_creator: user.username
					  });
					  
					  user.links.push(link);

				user.save(function (err) {
					if (err) return res.send(err);
		  				
						link.save(function (err) {
						    if (err) return res.send(err);
						    //res.json(user);
						    res.json({ 
			      				success: true, 
			      				message: 'Your short link is localhost:8080/redirect/' + link.shortlinkname 
			    			});
						});
					
				})
			})
		});

	//Update links (description, tags)
	apiRouter.put('/links/:short_link', function(req, res) {
		Links
			.findOne({ shortlinkname: req.params.short_link })
			//.select('-_id linkname ')
			.exec(function (err, link) {
				if (err) res.send(err);
				if (link) {
					if (req.body.description) {
						link.description = req.body.description;
					} else link.description = '';
					if (req.body.tags) {
						link.tags = lib.toSplitTags(req.body.tags);
					} else link.tags = [];
					link.save(function (err) {
						if (err) return res.send(err);
						//res.json(link);
						res.json({ 
		      				success: true, 
		      				message: 'Success edit!' 
		    			});
					});	
				} else res.json({ 
	      				success: false, 
	      				message: 'No links to update.' 
	    			});
			})
	});


	// api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	return apiRouter;
};