import nextConnect from 'next-connect';
import middleware from '../middlewares/middleware';
import { extractTemplate } from '../lib/api-helpers';

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => res.json({ template: extractTemplate(req) }));

handler.post(async (req, res) => {
	const { name, req_template } = req.body;
	const template = await req.db
		.collection('templates')
		.insertOne({ name, template: req_template })
		.then((response) => console.log(response))
		.catch((error) => console.error(error));
	res.status(200).json({
		template: extractTemplate(req)
	});
	// req.logIn(template, (err) => {
	// 	if (err) throw err;
	// 	res.status(201).json({
	// 		template: extractTemplate(req)
	// 	});
	// });
});

export default handler;
