const express = require('express')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

const canvasControllers = require('../controllers/canvas-controllers')

// router.post('/shoestodb', canvasControllers.addShoesToDb)
router.get('/shoes', canvasControllers.getAllShoeProducts)
router.get('/shoes/:id', canvasControllers.getShoeProductById)

router.use(checkAuth)

router.get('/checkout/bag/:uid', canvasControllers.getProductsFromBag)
router.post('/checkout/bag', canvasControllers.addProductToBag)
router.delete('/checkout/bag/:id',canvasControllers.deleteProductFromBag)

router.get('/checkout/wishlist/:uid', canvasControllers.getProductsFromWishlist)
router.post('/checkout/wishlist', canvasControllers.addProductToWishlist)
router.delete('/checkout/wishlist/:id', canvasControllers.deleteProductFromWishlist)

router.patch('/shoes/rating/:id', canvasControllers.changeshoeratingById)

router.get('/checkout/myorders/:uid', canvasControllers.getOrdersById)
router.post('/checkout/myorders', canvasControllers.addOrdersById)
router.patch('/shoes/stocksize/:id', canvasControllers.reduceStockSize)

module.exports = router