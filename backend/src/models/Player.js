import mongoose from "mongoose";
import User from "./User.js";

// Modelo de jogadora herdando propriedades do modelo da usuaria
const playerSchema = new mongoose.Schema({
    height: {type: Number, required: true},
    age: {type: Number, required: true},
    position: {type: String, required: true},
}, {versionKey: false});

// Aqui o Player herda as propriedades da usuaria padrão
const Player = User.discriminator('Player', playerSchema)

export default Player;