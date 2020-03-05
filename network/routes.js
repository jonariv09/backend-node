const messageRouter = require('../components/message/network')

const routes = (server) => {
  server.use('/message', messageRouter)
}

module.exports = routes;
