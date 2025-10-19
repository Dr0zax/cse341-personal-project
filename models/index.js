import config from '../db/config.js';
import mongoose from 'mongoose';
import task from './task.js';
import user from './user.js';
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.url;
db.task = task;
db.user = user;

export default db;
