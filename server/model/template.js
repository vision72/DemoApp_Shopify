import mongoose, { Schema } from 'mongoose';

const MODEL_NAME = 'HTMLTemplate';

const schema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		template: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, schema, 'htmltemplates');
