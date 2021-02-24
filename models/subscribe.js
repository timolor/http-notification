const mongoose = require('mongoose')

const subscribeSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    },
    subscribeDate:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Subscribe', subscribeSchema)