export function extractTemplate(req) {
	if (!req.template) return null;
	// take only needed template fields to avoid sensitive ones
	const { name, template } = req.template;
	return {
		name,
		template
	};
}
