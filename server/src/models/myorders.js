const mongoose = require('mongoose')

const Schema = mongoose.Schema

const myordersSchema = new Schema({
    productsdetails: {
        products: { type: Array, required: true },
        totaloriginalprice: { type: Number, required: true },
        totaldiscountedprice: { type: Number, required: true },
        totaldiscountoffer: { type: Number, required: true },
        ordereddate: { type: String, required: true },
        deliverydate: { type: String, required: true },
    },
    deliverydetails:{
        name: {type: String, required:true},
        email: {type: String, required:true},
        street: {type: String, required:true},
        country: {type: String, required:true},
        zipcode: {type: String, required:true},
        paymentmethod: {type: String, required:true},
    },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
})

module.exports = mongoose.model('Order', myordersSchema)