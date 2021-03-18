const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error')
const Shoe = require('../models/shoes')
const Bag = require('../models/bag')
const Wishlist = require('../models/wishlist')
const User = require('../models/user')
const Order = require('../models/myorders')

const getAllShoeProducts = async (req, res, next) => {
    // res.json(DUMMY_PRODUCTS)
    let shoe
    try {
        shoe = await Shoe.find()
    } catch (err) {
        const error = new HttpError('Something Went wrong,please try again', 500)
        return next(error)
    }
    if (!shoe || shoe.length === 0) {
        return next(new HttpError('Cound not find products for provided your user'))
    }
    res.json({ shoe: shoe.map(b => b.toObject({ getters: true })) })
}
const getShoeProductById = async (req, res, next) => {
    const productId = req.params.id
    let product
    try {
        product = await Shoe.findById(productId)
    } catch (err) {
        const error = new HttpError('Something went Wrong', 500)
        return next(error)
    }
    if (!product) {
        return next(new HttpError('Cound not find the product', 404))
    }
    res.json({ product: product.toObject({ getters: true }) })
}

const getProductsFromBag = async (req, res, next) => {
    const userId = req.params.uid
    let bag
    try {
        bag = await Bag.find({ user: userId })
    } catch (err) {
        const error = new HttpError('Something Went wrong,please try again', 500)
        return next(error)
    }
    if (!bag || bag.length === 0) {
        return res.json({ bag: [] })
    }
    res.json({ bag: bag.map(b => b.toObject({ getters: true })) })
}
const addProductToBag = async (req, res, next) => {
    const { name, description, color, originalprice, discountedprice, discountoffer, pic, soldby, size, shoeid, user } = req.body
    const newbag = new Bag({
        name,
        description,
        color,
        originalprice,
        discountedprice,
        discountoffer,
        pic,
        soldby,
        size,
        shoeid,
        user
    })
    let creator
    try {
        creator = await User.findById(user)
    } catch (err) {
        const error = new HttpError('Adding to bagbfailed, please try again', 500)
        return next(error)
    }
    if (!creator) {
        const error = new HttpError('Could not find user for provided Id', 404)
        return next(error)
    }

    try {
        await newbag.save()
    } catch (err) {
        const error = new HttpError('Adding to bag failed, please try again', 500)
        return next(error)
    }
    res.status(201).json({ bag: newbag })
}
const deleteProductFromBag = async (req, res, next) => {
    const productId = req.params.id
    let bag
    try {
        bag = await Bag.findById(productId)
    } catch (err) {
        const error = new HttpError('Something Went wrong.Cound not delete the product, Please try again', 500)
        return next(error)
    }

    try {
        await bag.remove()
    } catch (err) {
        const error = new HttpError('Something Went wrong.Cound not delete the product, Please try again', 500)
        return next(error)
    }
    res.status(200).json({ message: 'Product deleted from Bag' })
}
// const clearBag = async (req, res, next) => {
//     const userId = req.params.uid
//     let bag
//     try {
//         bag = await Bag.findByuser(userId)
//     } catch (err) {
//         const error = new HttpError('zzzzzzzzzzz',500)
//         return next(error)
//     }
//     try{
//         await bag.remove()
//     }catch (err) {
//         const error = new HttpError('xxxxxxxxxxxx',500)
//         return next(error)
//     }
//     res.status(200).json({ message: 'cleeared' })
// }

const getProductsFromWishlist = async (req, res, next) => {
    const userId = req.params.uid
    let wishlist
    try {
        wishlist = await Wishlist.find({ user: userId })
    } catch (err) {
        const error = new HttpError('Something Went wrong,please try again', 500)
        return next(error)
    }
    if (!wishlist || wishlist.length === 0) {
        return res.json({ wishlist: [] })
    }
    res.json({ wishlist: wishlist.map(b => b.toObject({ getters: true })) })
}
const addProductToWishlist = async (req, res, next) => {
    const { name, description, color, originalprice, discountedprice, discountoffer, pic, soldby, size, shoeid, user } = req.body
    const newwishlist = new Wishlist({
        name,
        description,
        color,
        originalprice,
        discountedprice,
        discountoffer,
        pic,
        soldby,
        size,
        shoeid,
        user
    })
    let creator
    try {
        creator = await User.findById(user)
    } catch (err) {
        const error = new HttpError('Adding to bagbfailed, please try again', 500)
        return next(error)
    }
    if (!creator) {
        const error = new HttpError('Could not find user for provided Id', 404)
        return next(error)
    }

    try {
        await newwishlist.save()
    } catch (err) {
        const error = new HttpError('Adding to bag failed, please try again', 500)
        return next(error)
    }
    res.status(201).json({ wishlist: newwishlist })
}
const deleteProductFromWishlist = async (req, res, next) => {
    const productId = req.params.id
    let wishlist
    try {
        wishlist = await Wishlist.findById(productId)
    } catch (err) {
        const error = new HttpError('Something Went wrong.Cound not delete the product, Please try again', 500)
        return next(error)
    }

    try {
        await wishlist.remove()
    } catch (err) {
        const error = new HttpError('Something Went wrong.Cound not delete the product, Please try again', 500)
        return next(error)
    }
    res.status(200).json({ message: 'Product deleted from Wishlist' })
}

const changeshoeratingById = async (req, res, next) => {
    const { rating } = req.body
    const productId = req.params.id
    let product
    try {
        product = await Shoe.findById(productId)
    } catch (err) {
        const error = new HttpError('Something went Wrong', 500)
        return next(error)
    }
    if (!product) {
        return next(new HttpError('Cound not find the product', 404))
    }
    product.rating = Number(product.rating) * Number(product.rated)
    product.rating = product.rating + Number(rating)
    product.rated = product.rated + 1
    product.rating = product.rating/product.rated
    product.rating = product.rating.toFixed(1)
    try {
        await product.save()
    } catch (err) {
        const error = new HttpError('Something went Wrong,cannot save', 500)
        return next(error)
    }
    res.status(200).json({ product: product.toObject({ getters: true }) })
}

const getOrdersById = async (req, res, next) => {
    const userId = req.params.uid
    let order
    try {
        order = await Order.find({ user: userId })
    } catch (err) {
        const error = new HttpError('Something Went wrong,please try again', 500)
        return next(error)
    }
    if (!order || order.length === 0) {
        return res.json({ order: [] })
    }
    res.json({ order: order.map(b => b.toObject({ getters: true })) })
}
const addOrdersById = async (req, res, next) => {
    const { products, totaloriginalprice, totaldiscountedprice, totaldiscountoffer,ordereddate,deliverydate, userdata, user } = req.body
    const neworder = new Order({
        productsdetails: { products, totaloriginalprice, totaldiscountedprice, totaldiscountoffer, ordereddate, deliverydate },
        deliverydetails: { ...userdata },
        user
    })
    let creator
    try {
        creator = await User.findById(user)
    } catch (err) {
        const error = new HttpError('Adding to bagbfailed, please try again', 500)
        return next(error)
    }
    if (!creator) {
        const error = new HttpError('Could not find user for provided Id', 404)
        res.status(201).json({ order: [] })
    }

    try {
        await neworder.save()
    } catch (err) {
        const error = new HttpError('Adding to bag failed, please try again', 500)
        return next(error)
    }
    res.status(201).json({ order: neworder })
}
const reduceStockSize = async (req, res, next) => {
    const { shoesize } = req.body
    const shoeid = req.params.id
    let product
    try {
        product = await Shoe.findById(shoeid)
    } catch (err) {
        const error = new HttpError('Something went Wrong,cannot find product', 500)
        return next(error)
    }
    if(shoesize === 7){
        product.stockseven = product.stockseven - 1
    } else if(shoesize === 8){
        product.stockeight = product.stockeight - 1
    } else if(shoesize === 9){
        product.stocknine = product.stocknine - 1
    } else if(shoesize === 10){
        product.stockten = product.stockten - 1
    } else {
        product.stockeleven = product.stockeleven - 1
    }
    try {
        console.log(shoesize)
        await product.save()
    } catch (err) {
        const error = new HttpError('Something went Wrong,cannot save', 500)
        return next(error)
    }
    let shoe
    try {
        shoe = await Shoe.find()
    } catch (err) {
        const error = new HttpError('Something Went wrong,please try again', 500)
        return next(error)
    }
    if (!shoe || shoe.length === 0) {
        return next(new HttpError('Cound not find products for provided your user'))
    }
    res.json({ shoe: shoe.map(b => b.toObject({ getters: true })) })
}

// exports.addShoesToDb = addShoesToDb
exports.getAllShoeProducts = getAllShoeProducts
exports.getShoeProductById = getShoeProductById

exports.getProductsFromBag = getProductsFromBag
exports.addProductToBag = addProductToBag
exports.deleteProductFromBag = deleteProductFromBag

exports.getProductsFromWishlist = getProductsFromWishlist
exports.addProductToWishlist = addProductToWishlist
exports.deleteProductFromWishlist = deleteProductFromWishlist

exports.changeshoeratingById = changeshoeratingById

exports.getOrdersById = getOrdersById
exports.addOrdersById = addOrdersById
exports.reduceStockSize = reduceStockSize 