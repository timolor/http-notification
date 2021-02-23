const mongoose = require('mongoose')

const publisherSchema = new mongoose.Schema({
    data: {
        type: Object,
        required: true
    },
    publishDate:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Publisher', publisherSchema)