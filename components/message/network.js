/* aqui lo que vamos a incluir es todo lo que
  tenga que ver con el protoclo http
*/

const router = require('express').Router()
const controller = require('./controller')
const response = require('./../../network/response')

router.get('/', function (req, res) {
  response.success(req, res, 'Lista de mensajes')
})

router.post('/', function (req, res) {

  controller.addMessage(req.body.user,req.body.message)
    .then(() => {
      response.success(req, res, 'Creado correctamente', 201)
    })
    .catch(e => {
      console.error(e)
      response.error(req, res, 'Informacion invalida', 400)
    })

})

module.exports = router;