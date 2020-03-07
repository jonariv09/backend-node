const store = require('./store')

function addMessage(user, message) {

  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error('[messageController] No hay usuario o mensaje')
      return reject('Los datos son incorrectos')
    }

    const fullMessage = {
      user: user,
      message: message,
      data: new Date()
    }

    store.add(fullMessage)
    resolve(fullMessage)
  })
}

async function getMessages() {
  return new Promise((resolve, reject) => {
    resolve(store.list())
  })
}

function updateMessage(id, message) {
  return new Promise( async (resolve, reject) => {
    if(!id || !message) {
      reject('Invalid data')
      return false
    }
    
    await store.updateText(id, message)
    resolve(null)
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage
}

