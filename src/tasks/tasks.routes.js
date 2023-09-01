const express = require('express')
const tasksController = require('./tasks.controller')
const { validateTasksBody } = require('./middlewares/validate-body.middleware')
const tasksRouter = express.Router()

tasksRouter.get('/', tasksController.findAll)
tasksRouter.get('/:id', tasksController.findOne)
tasksRouter.post('/', validateTasksBody, tasksController.create)
tasksRouter.put('/:id', validateTasksBody, tasksController.update)

tasksRouter.delete('/:id', tasksController.remove)

module.exports.tasksRouter = tasksRouter
