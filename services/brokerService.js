require("dotenv").config();

const Publish = require("../models/publish");
const Subscribe = require("../models/subscribe");
const fetch = require("node-fetch");

exports.process = async (topic) => {
    try {
        console.log("::IN BROKER SERVICE::")
        let response = false;
        const recordSize = Number(process.env.RECORD_FETCH_SIZE || 10);

        //fetch unpublished records
        let publishedRequestForTopic = await Publish.find({ topic })
            .sort({ publishDate: 1 })
            .limit(recordSize);

        console.log("::PUBLISHED REQUESTS::")
        console.log(publishedRequestForTopic)

        //fetch all subscribers top this topic
        let subscribers = await Subscribe.find({ topic }).sort({
            subscribeDate: 1,
        });

        console.log("::SUBSCRIBERS::")
        console.log(subscribers)

        await Promise.all(
            publishedRequestForTopic.map(async (publishedRequest, index) => {
                console.log(index + " ::LOOPING ALL TOPICS:: ")
                await Promise.all(
                    subscribers.map(async (subscriber, index) => {
                        console.log(index + " ::LOOPING ALL SUBSCRIBERS")
                        response = sendRequestToClients(publishedRequest, subscriber);
                    })
                );
                console.log(" ::RESPONSE FROM SEND TO CLIENTS: " + JSON.stringify(response))
                //remove message from storage if at least on subscriber has acknowledged
                if (response) {
                    console.log(" ::DELETING PUBLISHED REQUEST:: ")
                    await Publish.deleteOne({ _id: publishedRequest._id });
                }

            })
        );
    } catch (e) {
        // Log Errors
        console.log("::AN EXCEPTION OCCURRED::")
        console.error(e);
        throw Error("Error while dispatching topic, Reason: " + e);
    }
};

sendRequestToClients = async (publishedRequest, subscriber) => {
    console.log("::SENDING REQUEST TO CLIENTS::")
    let returnValue = false;
    let response = await fetch(subscriber.url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(publishedRequest.data),
    });
    console.log("GOT RESPONSE:: ")
    console.log(JSON.stringify(response))
    if (response.ok) {
        returnValue = true;
    }
    return returnValue;
};
