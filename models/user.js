import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userSub: {
        type: String, 
        unique: true
    }
});

export default mongoose.model('users', userSchema);
