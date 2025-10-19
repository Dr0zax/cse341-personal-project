import config from '../db/config.js';
import mongoose from 'mongoose';
import task from './task.js';
import user from './user.js';
import label from './label.js';
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.url;
db.task = task;
db.label = label;
db.user = user;

export default db;
