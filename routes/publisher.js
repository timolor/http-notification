const express = require('express')
const router = express.Router()
const Publisher = require('../models/publisher') 
const publishController = require('../controllers/publishController')

//subscribing

router.get('/', async (req, res) => {

})

// router.post('/:topic', (req, res) => {
//     const topic = req.params.topic;
// })
router.post('/:topic', publishController.send)

module.exports = router