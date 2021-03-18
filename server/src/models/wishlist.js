const mongoose = require('mongoose')

const Schema = mongoose.Schema

const wishlistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    originalprice: { type: Number, required: true },
    discountedprice: { type: Number, required: true },
    discountoffer: { type: Number, required: true },
    pic: { type: String, required: true },
    soldby: { type: String, required: true },
    size: { type: Number, required: true },
    shoeid: { type: mongoose.Types.ObjectId, required: true},
    user: { type: mongoose.Types.ObjectId, required: true,ref: 'User' },
})

module.exports = mongoose.model('Wishlist', wishlistSchema)