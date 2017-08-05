'use strict'

const express = require('express')
const ProductCtrl = require('../controllers/product')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/products', ProductCtrl.getProducts);
api.get('/product/:productid', ProductCtrl.getProduct);
api.post('/product', ProductCtrl.createProduct);
api.put('/product/:productid', ProductCtrl.updateProduct);
api.delete('/product/:productid', ProductCtrl.deleteProduct);

api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'You allow acess'})
})


module.exports = api