var bodyParser = require('body-parser');
var Links      = require('../models/links');
var User       = require('../models/user');
var config     = require('../../config');

module.exports = function(app, express) {

	var infoRouter = express.Router();

	//Get all links
	infoRouter.get('/', function(req, res) {
		Links
			.find()
			//.select('-_id linkname ')
			.exec(function (err, link) {
				if (err) res.send(err);
				if (link) {
					res.json(link);
				} else res.json({ 
	      				success: false, 
	      				message: 'No Links.' 
	    			});
			})
	});

	//Get info by shortlinks
	infoRouter.get('/json/:short_link', function(req, res) {
		Links
			.findOne({ shortlinkname: req.params.short_link })
			//.select('-_id linkname ')
			.exec(function (err, link) {
				if (err) res.send(err);
				if (link) {
					res.json(link);
				} else res.json({ 
	      				success: false, 
	      				message: 'No Info.' 
	    			});
			})
	});

	return infoRouter;
};