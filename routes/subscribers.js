const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber') 
const subscribeController = require('../controllers/subscribeController')

//subscribing

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.send(subscribers)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', async (req, res) => {

    const subscriber = new Subscriber({
        url: req.body.url,
        subscriberToTopic: req.body.subscriberToTopic
    })

    try {
       const newSubscriber = await subscriber.save()
       res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// router.post('/:topic', (req, res) => {
//     const topic = req.params.topic;
// })

router.post('/:topic', subscribeController.send)

module.exports = router