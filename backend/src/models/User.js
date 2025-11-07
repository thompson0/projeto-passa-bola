import mongoose from 'mongoose';

// Modelo de usuaria padrão
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {discriminatorKey: 'role', versionKey: false});

const User = mongoose.model('User', userSchema);

export default User;