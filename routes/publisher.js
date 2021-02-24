const express = require('express')
const router = express.Router()
const Publish = require('../models/publish') 
const publishController = require('../controllers/publishController')

//subscribing

router.get('/', async (req, res) => {
    try {
        const published = await Publish.find();
        res.send(published)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

router.post('/:topic', publishController.send)

module.exports = router