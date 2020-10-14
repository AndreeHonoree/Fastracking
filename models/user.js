import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength:5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength:5,
        maxlength: 1024
    },
    role:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', userSchema);