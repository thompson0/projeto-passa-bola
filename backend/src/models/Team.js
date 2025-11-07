import mongoose from 'mongoose';

// Modelo de time, com a proprietaria, se referenciando ao modelo da jogadora
// Array de players se referenciando ao modelo das jogadoras, sempre pelo ObjectId delas
const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {type: String, required: true},
    city: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true},
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
}, {versionKey: false});

const Team = mongoose.model('Team', TeamSchema);

export default Team;