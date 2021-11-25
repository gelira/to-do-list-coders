function validateBody(rules) {
  return async function (request, response, next) {
    try {
      request.validatedBody = await rules.validate(request.body, { 
        abortEarly: false 
      });
      next();
    }
    catch (e) {
      const errors = e.errors;
      return response.status(422).json({ errors });
    }
  };
}

module.exports = {
  validateBody
};
