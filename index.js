'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config')
const PORT = config.port;

mongoose.connect(config.db, (err) => {
    if (err) {
        console.log(`error at connect to db ${err}`);
        return false;
    }
    console.log('Connection to db stablished');
    app.listen(PORT, () => {
        console.log(`API Rest running from port http://localhost:${PORT}`);
    });
});

