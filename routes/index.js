'use strict'

const express = require('express')
const ProductCtrl = require('../controllers/product')
const api = express.Router()

api.get('/products', ProductCtrl.getProducts);
api.get('/product/:productid', ProductCtrl.getProduct);
api.post('/product', ProductCtrl.createProduct);
api.put('/product/:productid', ProductCtrl.updateProduct);
api.delete('/product/:productid', ProductCtrl.deleteProduct);


module.exports = api