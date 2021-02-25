require("dotenv").config();

const Publish = require("../models/publish");
const Subscribe = require("../models/subscribe");
const axios = require('axios');
const { DISPATCH_ERROR } = require("../utils/Constants");

exports.process = async (topic) => {
    try {
        const recordSize = Number(process.env.RECORD_FETCH_SIZE || 10);

        //fetch unpublished records
        let publishedRequestForTopic = await Publish.find({ topic })
            .sort({ publishDate: 1 })
            .limit(recordSize);

        //fetch all subscribers top this topic
        let subscribers = await Subscribe.find({ topic }).sort({
            subscribeDate: 1,
        });

        //loop through request for selected topic
        //send to subscribers of that topic
        await Promise.allSettled(
            publishedRequestForTopic.map(async (publishedRequest, index) => {

                await Promise.allSettled(
                    subscribers.map(async (subscriber, index) => {
                        const postResponse = sendRequestToClient(publishedRequest, subscriber)
                        postResponse.then(async (result) => {
                            if (result.status === 200) {
                                await Publish.deleteOne({ _id: publishedRequest._id });
                            }

                        }).catch(err => console.log(err))

                    })
                )

            })
        )
    } catch (e) {
        throw Error(DISPATCH_ERROR + e);
    }
};



sendRequestToClient = async (publishedRequest, subscriber) => {
    return new Promise((resolve, reject) => {
        axios.post(subscriber.url, {
            data: publishedRequest.data
        })
        .then((response) => {
            resolve(response)
        })
        .catch(function (error) {
            reject(error)
        });
    })
};
