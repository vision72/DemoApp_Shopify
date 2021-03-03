import dbMiddleWare from './database';
import nextConnect from 'next-connect';

export default function createHandler(...middlewares) {
	return nextConnect().use(dbMiddleWare, ...middlewares);
}
