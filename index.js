import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js';
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config()
const app = express();


//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Servidor no disponible"
    return res.status(errorStatus).json({
        message: errorMessage,
        status: errorStatus,
        success: false,
        stack:err.stack
    })
})
const port = process.env.PORT || 8000
app.listen(port, () => { 
    console.log('Conectado al backend');
    connect()

})


app.get("/", (req, res) => {
    res.send(200, "Todo oK")
})