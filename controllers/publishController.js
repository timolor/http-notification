const AppError = require("../utils/appError");
const PublishService = require("../services/publishService");
const BrokerService = require("../services/brokerService");
const { PROCESSING_ERROR } = require("../utils/Constants");

exports.send = async (req, res, next) => {
  try {
    const topic = req.params.topic;
    const data = req.body;

    let publish = await PublishService.publish(topic, data);

    if (publish) {
      BrokerService.process(topic)
        .then(() => console.log("broker service finished"))
        .catch((error) => console.error(error.message));

      res.status(200).json({ topic, data });
    }
    res.status(500).json({ message: PROCESSING_ERROR });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
