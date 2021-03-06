'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const services = require('../services')

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayname: req.body.displayname
    })
    user.save(err => {
        if (err) return res.status(500).send({message: `Error at create user ${err}`})

        res.status(200).send({ token: services.createToken(user) })
    })
}

function signIn(req, res) {
    User.find({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send({message: `Error ${err}`})
        if (!user) return res.status(404).send({message: 'user not found'})

        req.user = user
        res.status(200).send({
            message: 'login successful',
            token: services.createToken(user)
        })
    })
}

module.exports = {
    signUp,
    signIn
}