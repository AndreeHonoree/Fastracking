import mongoose from 'mongoose';
import {Client} from './client.js'
import {clientSchema} from './client.js'


const orderSchema = new mongoose.Schema({
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Client',
        // type:clientSchema,
        // required: true
    },
    productType:{
        type: String
    },
    isOrdered: Boolean,
    price: {
        type: String,
        required: function() {return this.isOrdered}
    },
    clientId : {
        type: String,
        required: true,
        foreignKey: true
    }
});

export const Order = mongoose.model('Order', orderSchema);