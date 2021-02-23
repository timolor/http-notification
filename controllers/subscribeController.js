const AppError = require("../utils/appError");

exports.send = async (req, res, next) => {
    try {
      const topic = req.params.topic;

      const { url } = req.body;
  
    res.status(200).json({
        url,
        topic
    })
    } catch (err) {
      next(err);
    }
  };