var bodyParser = require('body-parser');
var Links      = require('../models/links');
var User       = require('../models/user');
var config     = require('../../config');

module.exports = function(app, express) {

	var tagRouter = express.Router();

	//Get links from tag
	tagRouter.get('/json/:tagname', function(req, res) {
		Links
			.find({ tags: req.params.tagname })
			.select('-hits ')
			.exec(function (err, link) {
				if (err) res.send(err);
				if (link.length !== 0) {
					res.json(link);
				} else res.json({ 
	      				success: false, 
	      				message: 'No links.' 
	    			});
			})
	});

	return tagRouter;
};