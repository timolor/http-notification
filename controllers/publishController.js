const AppError = require("../utils/appError");
const PublishService = require("../services/publishService");
const BrokerService = require("../services/brokerService");
const { PROCESSING_ERROR, BROKER_SUCCESSFUL } = require("../utils/Constants");

exports.send = async (req, res, next) => {
  try {
    const topic = req.params.topic;
    const data = req.body;

    let publish = await PublishService.publish(topic, data);

    if (publish) {
      BrokerService.process(topic)
        .then(() => console.log(BROKER_SUCCESSFUL))
      
      res.status(200).json({ topic, data });
    }else{
      res.status(500).json({ message: PROCESSING_ERROR });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
