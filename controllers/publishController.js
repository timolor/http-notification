const AppError = require("../utils/appError");

exports.send = async (req, res, next) => {
    try {
      const topic = req.params.topic;

      const data  = req.body;
  
      // 1) check if email and password exist
      // if (!email || !password) {
      //   return next(
      //     new AppError(404, "fail", "Please provide email or password"),
      //     req,
      //     res,
      //     next,
      //   );
      // }
      
      res.status(200).json({
        topic,
        data
      })
      
  
      // res.status(200).json({
      //   status: "success",
      //   token,
      //   data: {
      //     user,
      //   },
      // });
    } catch (err) {
      next(err);
    }
  };
  