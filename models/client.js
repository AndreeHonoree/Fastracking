import mongoose from 'mongoose';


const clientSchema = new mongoose.Schema({
    clientName: {type: String, required: true, minlength:5, maxlength:255},
    companyName: {type: String, required: true},
    tin: {type: Number, required: true},
    email: String,
    password: String,
    phone: {type: Number, required: true, minlength:10, maxlength:10},
    date: {type:Date, default:Date.now}
});

export const Client = mongoose.model('Client', clientSchema);


export {clientSchema};
