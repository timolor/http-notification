const express = require('express')
const router = express.Router()

// router.get('/test1', async (req, res) => {
//     try {
//         const { data } = req.body
//         res.send(data)
//         console.log(data)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json(error)
//     }
// })

router.get(['/test1', '/test2'], async (req, res) => {
    try {
        const { data } = req.body
        res.send(data)
        console.log(data)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

module.exports = router