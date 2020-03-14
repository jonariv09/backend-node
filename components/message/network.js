/* aqui lo que vamos a incluir es todo lo que
  tenga que ver con el protoclo http
*/

const router = require('express').Router()
const controller = require('./controller')
const response = require('./../../network/response')

router.get('/', function (req, res) {
  let filterUser = req.query.user || null
  controller.getMessages(filterUser)
    .then((messageList) => {
      response.success(req, res, messageList, 200)
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e)
    })
})

router.get('/:id', function (req, res) {
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

router.patch('/:id', function (req, res) {

  controller.updateMessage(req.params.id, req.body.message)
    .then(() => {
      response.success(req, res, 'Actualizado correctamente', 200)
    })
    .catch(err => {
      response.error(req, res, 'Fallo la actualizacion del mensaje', 500, e)
    })
})

router.delete('/:id', function (req, res) {
  controller.deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Message ${req.params.id} deleted`, 200)
    })
    .catch(() => {
      response.err(req, res, 'Error interno', e)
    })
})

module.exports = router