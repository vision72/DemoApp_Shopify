import mongoose from 'mongoose';

export async function database(req, res, next) {
	if (mongoose.connection.readyState >= 1) return;

	return mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true
	});
}

export function jsonify(object) {
	return JSON.parse(JSON.stringify(object));
}

export default async function dbMiddleWare(req, res, next) {
	try {
		if (!global.mongoose) {
			global.mongoose = database();
		}
	} catch (err) {
		console.error(err);
	}

	return next();
}
