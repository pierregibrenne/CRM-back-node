const express = require('express')
const { Pool } = require('./pool')
const cors = require('cors')
const { tasksRouter } = require('./tasks/tasks.routes')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message, status: 500 })
})
app.use('/tasks', tasksRouter)

app.get('/', (req, res) => {
  res.send('Salut')
})

const PORT = process.env.PORT || 3000

function start() {
  Pool.connect({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  })
    .then(() => {
      console.log('Connexion à Postgres établie avec succès.')
      app.listen(PORT, () => {
        console.log(`Le serveur écoute sur le port ${PORT}.`)
      })
    })
    .catch((err) => {
      console.error(err)
      setInterval(start, 3000)
    })
}

start()
