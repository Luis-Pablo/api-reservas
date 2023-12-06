import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    photos: {
        type: [String],
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
    
    

}, { timestamps: true } 
);

export default mongoose.model('User', UserSchema)