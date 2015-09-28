var bodyParser = require('body-parser');
var User       = require('../models/user');
var Links      = require('../models/links');
var config     = require('../../config');

module.exports = function(app, express) {

	var redirectRouter = express.Router();

	redirectRouter.get('/json/:short_link', function(req, res) {
		Links
			.findOne({ shortlinkname: req.params.short_link })
			.populate('links')
			//.select('-_id linkname ')
			.exec(function (err, link) {
				if (err) res.send(err);
				if(link) {
					link.hits = link.hits + 1;
					link.save(function (err) {
						if (err) return res.send(err);
						//res.redirect('http://' + link.linkname);
						res.json(link);
					});
				} else res.json({
					success: false,
					message: 'No links.'
				});
				//res.json(hits);
				//res.redirect('http://' + link.linkname);
			})
	});

	return redirectRouter;
};