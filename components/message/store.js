const { connection, ObjectId } = require('../../db')
const Message = require('./model')
let dbo = null

connection()
  .then(conn => dbo = conn)

async function addMessage(fullMessage) {
  const newMessage = new Message(fullMessage)
  await dbo.collection('Message').insertOne(newMessage)
}

function getMessages(filterUser) {
  const query = filterUser ? { user: { $eq: filterUser } } : {  }
  
  return dbo.collection('Message').find(query)
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