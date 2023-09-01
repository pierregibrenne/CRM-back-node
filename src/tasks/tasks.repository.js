const { Pool } = require('../pool')

async function findAll() {
  const { rows } = await Pool.query('SELECT * FROM trello')
  return rows
}

async function findOne(id) {
  const { rows } = await Pool.query('SELECT * FROM trello WHERE id=$1', [id])
  return rows[0]
}

async function create(taskTaskData) {
  const { state, task } = taskTaskData
  const { rows } = await Pool.query(
    `INSERT INTO trello (state, task) 
    VALUES($1,$2) RETURNING *`,
    [state, task],
  )
  return rows[0]
}

async function update(id, updateTaskData) {
  const { state, task } = updateTaskData
  const { rows } = await Pool.query(
    `
        UPDATE trello
        SET 
            state=$1,
            task=$2           
        WHERE id=$3
        RETURNING id,state,task
      `,
    [state, task, id],
  )
  return rows[0]
}

async function remove(id) {
  const { rows } = await Pool.query(
    'DELETE FROM trello WHERE id=$1 RETURNING *',
    [id],
  )
  return rows[0]
}

async function findOneBy(filerColumn) {
  const column = Object.keys(filerColumn)[0]
  const value = Object.values(filerColumn)[0]
  const { rows } = await Pool.query(`SELECT * FROM trello WHERE ${column}=$1`, [
    value,
  ])
  return rows[0]
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
  findOneBy,
}
