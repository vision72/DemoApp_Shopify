import nextConnect from 'next-connect';
import cleanBody from './cleanBody';
import database from './database';
import session from './session';

const middleware = nextConnect();

middleware.use(cleanBody).use(database).use(session);

export default middleware;
