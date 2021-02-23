require('dotenv').config()

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
    .connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('Connected to database'))
    .catch(error => console.error(error))

// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to database') )

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
const publisherRouter = require('./routes/publisher')

app.use('/subscribers', subscribersRouter)
app.use('/publish', publisherRouter)

app.listen(3000, () => console.log("Server has started"));
