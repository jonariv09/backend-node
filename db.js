const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
require('dotenv').config()
let Connection = null

const {
  DB_USER,
  DB_PASS,
  DB_URI
} = process.env

async function connection() {
  mongoose.Promise = global.Promise
  Connection = await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'telegrom'
  }, function (error, db) {
    if (error) {
      throw error
    } else {
      console.log("[db] Database Connected")
      return db
    }
  })
    .catch(e => console.log(e))

  return Connection.connections[0]
}

module.exports = { connection, ObjectId }