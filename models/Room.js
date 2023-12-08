import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    price: {
        type: Number,
        required: true,
     
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: false,
    },
    roomNumber: [{ number: Number, unavailableDates: { type: [Date] } }]
    
}, { timestamps: true }
);

RoomSchema.plugin(mongoosePaginate)
export default mongoose.model('Room', RoomSchema)