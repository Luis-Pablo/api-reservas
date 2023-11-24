import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('MongoDB conectado');
    } catch (error) {
        throw error;
    }
}


mongoose.connection.on('disconnected', () => {
    console.log('MongoDB desconectado ');
})

export default connect;