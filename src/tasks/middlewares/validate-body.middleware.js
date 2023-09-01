const { TaskSchema } = require('../tasks.schema')

function validateTasksBody(request, response, next) {
  for (const attr in request.body) {
    if (!TaskSchema[attr]) {
      delete request.body[attr]
    }
  }

  const error = {
    errors: {},
    status: null,
  }

  for (const attr in TaskSchema) {
    if (!request.body[attr] || typeof request.body[attr] !== TaskSchema[attr]) {
      error.errors[
        attr
      ] = `${attr} cannot be empty or should be a ${TaskSchema[attr]}`
    }
  }
  const errorLength = Object.keys(error.errors).length
  if (errorLength) {
    error.status = 422
    return response.status(422).send(error)
  }
  next()
}

module.exports.validateTasksBody = validateTasksBody
