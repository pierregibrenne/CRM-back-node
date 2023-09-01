const pg = require('pg')

class Pool {
  constructor() {
    this._pool = null
  }

  connect(options) {
    this._pool = new pg.Pool(options)
    return this._pool.query('SELECT 1+1')
  }

  query(sql, params) {
    return this._pool.query(sql, params)
  }

  close() {
    this._pool.end()
  }
}

module.exports.Pool = new Pool()
