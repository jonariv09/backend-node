const mongoose = require('mongoose')
require('dotenv').config()
const Message = require('./model')
const ObjectId = mongoose.Types.ObjectId
let dbo = null;

const {
  DB_USER,
  DB_PASS,
  DB_URI
} = process.env

mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'telegrom'
}, function(error, db) {
  if(error) {
    throw error
  } else {
    dbo = db
    console.log('[db] conectada con exito')
  }
})
.catch(e => console.log(e))

async function addMessage(fullMessage) {
  const newMessage = new Message(fullMessage)
  await dbo.collection('Message').insertOne(newMessage)
}

function getMessages(filterUser) {
  return filterUser == null ? 
  dbo.collection('Message').find()
    .toArray()
    .then(data => {
      if(data)
        return data
    })
    :
    dbo.collection('Message').find({ user: { $eq: filterUser } })
    .toArray()
    .then(data => {
      if(data)
        return data
    })
}

async function updateText(id, message) {

  return await dbo.collection('Message').updateOne(
    { _id: ObjectId(id) }, // filter
    { $set: { message: message } }, // update
    function(err, res) {
      if(err)
        throw err
    })

}

function removeMessage(id) {
  return dbo.collection('Message').deleteOne({ _id: ObjectId(id) })
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateText,
  remove: removeMessage
}