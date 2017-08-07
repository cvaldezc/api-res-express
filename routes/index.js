'use strict'

const express = require('express')
const ProductCtrl = require('../controllers/product')
const auth = require('../middlewares/auth')
const UserCtrl = require('../controllers/user')
const api = express.Router()

api.post('/signup', UserCtrl.signUp);
api.post('/signin', UserCtrl.signIn);

api.get('/products', ProductCtrl.getProducts);
api.get('/product/:productid', ProductCtrl.getProduct);
api.post('/product', auth, ProductCtrl.createProduct);
api.put('/product/:productid', auth, ProductCtrl.updateProduct);
api.delete('/product/:productid', auth, ProductCtrl.deleteProduct);

api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'You allow acess'})
})


module.exports = api