exports.validate = function validate(scheme, reqPart = "body") {
  return (req, res, next) => {
    const validationResult = scheme.validate(req[reqPart]);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  };
};

exports.validateAuth = function validate(scheme) {
  return (req, res, next) => {
    const validationResult = scheme.validate(req.body);
    if (validationResult.error) {
      const {
        details: [{ message }],
      } = validationResult.error;
      return res.status(400).send(message);
    }
    next();
  };
};
