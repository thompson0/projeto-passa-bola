import express from 'express';
import dbConnection from './config/connect.js';
import cors from 'cors';
import routes from './routes/index.js';
import dotenv from 'dotenv'

dotenv.config()
// Conexão com o mongodb
const connection = await dbConnection();
connection.on('error', (error) => {
  console.log("Error to connect to database", error)
});

connection.once('open', () => {
  console.log("Database connected successfully");
});

const app = express();
app.use(cors());
routes(app); // chama as rotas organizadas

export default app;