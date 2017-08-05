'use strict'

const services = require('../services')

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'No tienes autorizacion'})
    }
    const token = res.headers.authorization.split(' ')[1]

    services.decodeToken(token)
        .then( response => {
            res.user = response
            next()
        })
        .catch( response => {
            res.status(response.status).send(response.message)
        })
}

module.exports = isAuth