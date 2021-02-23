const express = require('express')
const router = express.Router()
const Publisher = require('../models/publisher') 

//subscribing

router.get('/', async (req, res) => {

})

// router.post('/', async (req, res) => {

//     const subscriber = new Subscriber({
//         url: req.body.url,
//         subscriberToTopic: req.body.subscriberToTopic
//     })

//     try {
//        const newSubscriber = await subscriber.save()
//        res.status(201).json(newSubscriber)
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

router.post('/:topic', (req, res) => {
    const topic = req.params.topic;
})

module.exports = router