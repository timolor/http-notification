const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    subscriberToTopic:{
        type: String,
        required: true
    },
    subscribeDate:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)