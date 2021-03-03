import HTMLTemplate from '../../../server/model/template';
import createHandler from '../../../server/middlewares/index';

const handler = createHandler();

handler.get(async (req, res) => {
	const templates = await HTMLTemplate.find({ name: req.body.template }).exec();
	res.status(200).json(templates);
});

handler.post(async (req, res) => {
	const { template, html } = req.body;
	const template = await HTMLTemplate.insert({ name: template, template: html });
	res.status(200).json(template);
});

export default handler;
