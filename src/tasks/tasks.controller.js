const tasksService = require('./tasks.service')

async function findAll(_, res) {
  const tasks = await tasksService.findAll()
  res.send(tasks)
}

async function findOne(req, res) {
  const id = req.params.id

  try {
    const task = await tasksService.findOne(id)

    res.send(task)
  } catch (error) {
    res.status(404).send(error.message)
  }
}

async function create(req, res) {
  try {
    const task = await tasksService.create(req.body)
    res.send(task)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
async function update(req, res) {
  const id = req.params.id
  const task = await tasksService.update(id, req.body)
  res.send(task)
}

async function remove(req, res) {
  const id = req.params.id
  const task = await tasksService.remove(id)
  res.send(task)
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
}
