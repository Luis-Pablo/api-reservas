import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js';

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id}
            });


        } catch (err) {
            next(err)
        }
        res.status(201).json(savedRoom)
    } catch (err) {
        next(err)
    }
}



export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateRoom)
    } catch (err) {
        next(err)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne({ "roomNumber._id": req.params.id }, { $push: {"roomNumber.$.unavailableDates": req.body.dates}})
        res.status(200).json("Habitación ha sido actualizada")
    } catch (err) {
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id }
            });


        } catch (err) {
            next(err)
        }
        res.status(200).json({"message": "Habitación eliminada"})
    } catch (error) {
        next(err)
    }
}


export const getRoom = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(req.params.id)
        res.status(200).json(getRoom)
    } catch (err) {
        next(err)
    }
}

export const getRooms = async (req, res, next) => {
    const { limit, page, ...others } = req.query;
    const options = {
        page: page || 1,
        limit: limit || 9999999,
    };
    try {
        const getRooms = await Room.paginate({...others}, options)
        const { docs: results, ...other } = getRooms
        res.status(200).json({ results: results, info: { ...other } })
    } catch (err) {
        next(err)
    }
}