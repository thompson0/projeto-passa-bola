import mongoose, {mongo} from 'mongoose';

const dbConnection = async () => {
    // Função para se conectar ao banco do mongodb
    mongoose.connect(process.env.DB_CONNECTION_STRING)

    return mongoose.connection;
}

export default dbConnection;