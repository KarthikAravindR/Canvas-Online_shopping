const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shoeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true},
    rated: { type: Number, required: true},
    color: { type: String, required: true },
    stockseven: { type: Number, required: true },
    stockeight: { type: Number, required: true },
    stocknine: { type: Number, required: true },
    stockten: { type: Number, required: true },
    stockeleven: { type: Number, required: true },
    originalprice: { type: Number, required: true },
    discountedprice: { type: Number, required: true },
    discountoffer: { type: Number, required: true },
    pic1: { type: String, required: true },
    pic2: { type: String, required: true },
    pic3: { type: String, required: true },
    pic4: { type: String, required: true },
    pic5: { type: String, required: true },
    productdetail1: { type: String, required: true },
    productdetail2: { type: String, required: true },
    productdetail3: { type: String, required: true },
    productdetail4: { type: String, required: true },
    productdetail5: { type: String, required: true },
    materialcare1: { type: String, required: true },
    materialcare2: { type: String, required: true },
    type: { type: String, required: true },
    pattern: { type: String, required: true },
    shoewidth: { type: String, required: true },
    insole: { type: String, required: true },
    toeshape: { type: String, required: true },
    fastening: { type: String, required: true },
    ankleheight: { type: String, required: true },
    solematerial: { type: String, required: true },
    productcode: { type: Number, required: true },
    soldby: { type: String, required: true },
})

module.exports = mongoose.model('Shoe', shoeSchema)


