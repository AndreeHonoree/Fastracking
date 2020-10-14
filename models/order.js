import mongoose from 'mongoose';
import {Client} from './client.js'
import {clientSchema} from './client.js'


const orderSchema = new mongoose.Schema({
    client:{
        type: new mongoose.Schema({
            companyName:{
                type: String,
                required: true
            },
            tin: {
                type: Number,
                required: true
            },
            phone: {
                type: Number,
                minlength:0,
                maxlength: 10,
                required: true
            }
        }),
        required: true
    },
    productType:{
        type: String
    },
    isOrdered: Boolean,
    price: {
        type: String,
        required: function() {return this.isOrdered}
    }
});

export const Order = mongoose.model('Order', orderSchema);