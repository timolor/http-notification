const AppError = require("../utils/appError");
const SubscribeService = require('../services/subscribeService')
const { PROCESSING_ERROR } = require('../utils/Constants')


exports.send = async (req, res, next) => {
    try {
        const topic = req.params.topic
        const { url } = req.body

        let subscription = await SubscribeService.subscribe(topic, url);

        if (subscription) {
            res.status(200).json({ url, topic })
        }
        res.status(500).json({ message: PROCESSING_ERROR })

    } catch (err) {
        res.status(500).json({ message: err.message })
        // return next( new AppError(500, "failed", err.message), 
        //     req,
        //     res,
        //     next
        // );
    }
};


exports.receive = async (req, res) => {
    try {
        const { data } = req.body
        res.status(200).json({ data })
        console.log(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};