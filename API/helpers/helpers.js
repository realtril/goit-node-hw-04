exports.tcWrapper = function tcWrapper(f) {
  return function (req, res, next) {
    f(req, res, next).catch(next);
  };
};
