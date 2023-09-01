const tasksRepository = require('./tasks.repository')

async function findAll() {
  const tasks = await tasksRepository.findAll()
  return tasks
}

async function findOne(id) {
  const task = await tasksRepository.findOne(id)
  if (!task) {
    throw new Error('task not found')
  }
  if (task) {
    return { ...task }
  }
  return task
}

async function create(createTaskBody) {
  const task = await tasksRepository.create(createTaskBody)
  return task
}

async function update(id, updateTaskBody) {
  await findOne(id)
  const task = await tasksRepository.update(id, updateTaskBody)
  return task
}
async function remove(id) {
  await findOne(id)
  const task = await tasksRepository.remove(id)
  return task
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
}
