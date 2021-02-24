require("dotenv").config();

const Publish = require("../models/publish");
const Subscribe = require("../models/subscribe");

exports.process = async (topic) => {
  try {
    let response = false;
    const recordSize = process.env.RECORD_FETCH_SIZE || 10;

    //fetch unpublished records
    let publishedRequestForTopic = await Publish.find({ status: false, topic })
      .sort({ publishDate: 1 })
      .limit(recordSize);

    //fetch all subscribers top this topic
    let subscribers = await Subscribe.find({ topic }).sort({
      subscribeDate: 1,
    });

    await Promise.all(
      publishedRequestForTopic.map(async (publishedRequest, index) => {
        await Promise.all(
          subscribers.map(async (subscriber, index) => {
            response = sendRequestToClients(publishedRequest, subscriber);
          })
        );

        //if a subscriber has received the message delete
        await Publish.deleteOne({ _id: publishedRequest._id });

        // const filter = { _id: publishedRequest._id }
        // const update = { isPublished: true }
        // await Publish.findOneAndUpdate(filter, update, {
        //     new: true
        // });
      })
    );
  } catch (e) {
    // Log Errors
    console.error(e);
    throw Error("Error while subscribing to topic, Reason: " + e);
  }
};

sendRequestToClients = async (publishedRequest, subscriber) => {
  let returnValue = false;
  let response = await fetch(subscriber.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(publishedRequest.data),
  });
  if (response.ok) {
    returnValue = true;
  }
  return returnValue;
};
