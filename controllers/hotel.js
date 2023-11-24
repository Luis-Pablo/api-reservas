import Hotel from "../models/Hotel.js";
import Room from '../models/Room.js';

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const saveHotel = await newHotel.save()
        res.status(201).json(saveHotel)
    } catch (err) {
        next(err)
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,{ $set:req.body}, { new: true })
        res.status(200).json(updateHotel)
    } catch (err) {
        next(err)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteHotel)
    } catch (err) {
        next(err)
    }
}


export const getHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    } catch (err) {
        next(err)
    }
}

export const getHotels = async (req, res, next) => {
    const {min, max, limit, ...others} = req.query
    try {
        const getHotels = await Hotel.find({
            ...others,
            cheapestPrice:{$gte:(min) || 1, $lte:parseInt(max) || 9999999}
        }).limit(parseInt(req.query.limit))
        res.status(200).json(getHotels)
    } catch (err) {
        next(err)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(c => {
            return Hotel.countDocuments({city:c})
        }))        
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}


export const countByType = async (req, res, next) => {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });
    try {
        res.status(200).json([
            { type: 'hotel', count: hotelCount },
            { type: 'apartment', count: apartmentCount },
            { type: 'villa', count: villaCount },
            { type: 'resort', count: resortCount },
            { type: 'cabin', count: cabinCount }
        ])
  
        
    } catch (err) {
        next(err)
    }
}


export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }))
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
    }
}