const express = require('express')
const echoRouter = express.Router()

echoRouter.post(['/test1', '/test2'], async (req, res) => {
    try {
        const { data } = req.body
        console.log(data)
        res.send(data);
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

module.exports = echoRouter