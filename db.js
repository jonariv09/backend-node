const mongoose = require('mongoose')
require('dotenv').config()
const ObjectId = mongoose.Types.ObjectId
let dbo = null;
let result = null;

const {
  DB_USER,
  DB_PASS,
  DB_URI
} = process.env


async function connection() {
  mongoose.Promise = global.Promise
  result = await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URI}`, {
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

  return result.connections[0]
}
  
module.exports = { connection, ObjectId }
