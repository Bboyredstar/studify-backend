const { validationResult } = require("express-validator");

const validator = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next()
    }
    res.status(400).json({ message: 'Неверные данные', errors: errors.array() });
  }
}


module.exports = validator