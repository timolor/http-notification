require("dotenv").config();

const express = require("express");
const publisher = express();
const subscriber = express();
const mongoose = require("mongoose");

const subscribersRouter = require("./routes/subscribers");
const publisherRouter = require("./routes/publisher");
const echoRouter = require("./routes/echo");

mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error(error));

publisher.use(express.json());
subscriber.use(express.json());

subscriber.use("/subscribe", subscribersRouter);
publisher.use("/publish", publisherRouter);
subscriber.use("/", echoRouter)

publisher.listen(process.env.PUBLISHER_PORT || 8000, () => {
    console.log("Publisher Server has started");
});

subscriber.listen(process.env.SUBSCRIBER_PORT || 9000, () => {
    console.log("Subscriber Server has started");
});

