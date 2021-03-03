const api = require('express').Router();

//Api Routes
api.get('/1', async (req, res) => {});
api.get('/2', (req, res) => {
	res.json({ hi: 'from second api' });
});

module.exports = api;
