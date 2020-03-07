/* aqui lo que vamos a incluir es todo lo que
  tenga que ver con el protoclo http
*/

const router = require('express').Router()
const controller = require('./controller')
const response = require('./../../network/response')

router.get('/', function (req, res) {
  controller.getMessages()
    .then((messageList) => {
      response.success(req, res, messageList, 200)
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e)
    })
})

router.post('/', function (req, res) {

  controller.addMessage(req.body.user, req.body.message)
    .then(() => {
      response.success(req, res, 'Creado correctamente', 201)
    })
    .catch(e => {
      console.error(e)
      response.error(req, res, 'Informacion invalida', 400)
    })

})

module.exports = router;