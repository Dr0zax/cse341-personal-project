import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('users', userSchema);
