require("dotenv").config();

const express = require("express");
const publisher = express();
const subscriber = express();
const mongoose = require("mongoose");
const redis = require("redis");


// const redisClient = redis.createClient({
//     host: "us1-alive-mayfly-32104.upstash.io",
//     port: process.env.REDIS_PORT || "6379",
//     password: process.env.REDIS_PASSWORD || "",
// });
// redisClient.on("error",  (err)  => {
//     console.error(err);
// });

// redisClient.once('connect', ()=> console.log('Connected to Redis'))

mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error(error));

publisher.use(express.json());
subscriber.use(express.json());

const subscribersRouter = require("./routes/subscribers");
const publisherRouter = require("./routes/publisher");

subscriber.use("/subscribe", subscribersRouter);
publisher.use("/publish", publisherRouter);

publisher.listen(process.env.PUBLISHER_PORT || 8000, () => {
    console.log("Publisher Server has started");
});

subscriber.listen(process.env.SUBSCRIBER_PORT || 9000, () => {
    console.log("Subscriber Server has started");
});

