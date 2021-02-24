const mongoose = require('mongoose')

const publishSchema = new mongoose.Schema({
    topic:{
        type: String,
        required: true
    },
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

module.exports = mongoose.model('Publish', publishSchema)