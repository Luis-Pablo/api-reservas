import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: false,
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
        required: false,
    },
    photos: {
        type: [String],
        required: false,
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    phone: {
        type: String,
        required: false,
    }
    
    

}, { timestamps: true } 
);

UserSchema.plugin(mongoosePaginate)
export default mongoose.model('User', UserSchema)