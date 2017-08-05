'use strict'

const Product = require('../models/product');

function getProduct(req, res) {
    let pid = req.params.productid
    Product.findById(pid, (err, product) => {
        if (err) return res.status(500).send({raise: `error at request ${err}`})
        if (!product) return res.status(404).send({raise: 'product not exist'})

        res.status(200).send({ product })
    });
}

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({raise: `error at request ${err}`})
        if (!products) return res.status(404).send({raise: 'products not exist'})

        res.send(200, { products });
    });
}

function createProduct(req, res) {
    console.log('POST /api/product');
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.photo = req.body.photo
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description
    product.save((err, productStored) => {
        if (err) res.status(500).send({raise: `error at save product ${err}`})

        res.status(200).send({product: productStored});
    })
}

function updateProduct(req, res) {
    let pid = req.params.productid
    let updated = req.body
    console.log(pid)
    console.log(updated)
    Product.findByIdAndUpdate(pid, updated, (err, productUpdate) => {
        if (err) return res.status(500).send({raise: `error at updated product: ${err}`});
        if (!productUpdate) return res.status(404).send({raise: `Product not found`});
        res.status(200).send({ product: productUpdate })
    })
}

function deleteProduct(req, res) {
    let pid = req.params.productid;
    // console.log(pid);
    Product.findById(pid, (err, product) => {
        if (err) return res.status(500).send({raise: `Error ${err}`})
        if (!product) return res.status(404).send({raise: `Product not found`})
        // console.log(product);
        product.remove(err => {
            if (!err) return res.status(500).send({raise: `Error at remove product ${err}`})
            res.status(200).send({message: 'Product has been deleting'})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}