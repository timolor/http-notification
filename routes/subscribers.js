const express = require('express')
const router = express.Router()
const Subscribe = require('../models/subscribe') 
const subscribeController = require('../controllers/subscribeController')

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscribe.find();
        res.send(subscribers)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.post('/:topic', subscribeController.send)

module.exports = router