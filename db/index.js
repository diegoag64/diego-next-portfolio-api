const config = require('../config');
const mongoose = require('mongoose');

require('./models/portfolio');
require('./models/blog');

exports.connect = () => {
    return mongoose.connect(config.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, (err) => {
        if(err){console.error(err)}
        console.log('connected to DB!');
    })
}


