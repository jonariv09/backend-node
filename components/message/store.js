const mongoose = require('mongoose')
const Message = require('./model')
const ObjectId = mongoose.Types.ObjectId
let dbo = null;

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://jonariv09:jose123@cluster0-gnh6z.mongodb.net/test?retryWrites=true&w=majority', {
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
        return data;
    })
    :
    dbo.collection('Message').find({ user: { $eq: filterUser } })
    .toArray()
    .then(data => {
      if(data)
        return data;
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

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateText,
  // delete
}