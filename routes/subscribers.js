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

router.get('/receive/async', async (req, res) => {
    try {
        console.log('Called async test')
        const { data } = req.body
        console.log('Before calling stalled function')
        stall(3000)
            .then(()=> console.log('Stall function has finished'))
        
        console.log('Before sending response')
        res.send(data)
        console.log('After sending response')
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.post('/receive/topic', subscribeController.receive)


let stall = async (stallTime = 3000) => {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}

module.exports = router