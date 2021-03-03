const sanitize = require('mongo-sanitize');

module.exports = (req, res, next) => {
	try {
		req.body = sanitize(req.body);
		next();
	} catch (error) {
		console.log(`Clean body error: ${error}`);
		return res.status(500).json({
			error: true,
			message: 'Could not sanitize body'
		});
	}
};
