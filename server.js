const express = require('express')
const bodyParser = require('body-parser')
const response = require('./network/response')
const path = require('path')

var app = express()
app.set('port', 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/message', function (req, res) {
  response.success(req, res, 'Lista de mensajes')
})

app.post('/', function (req, res) {
  if (req.query.error == "ok") {
    response.error(req, res, 'Error simulado', 400)
  } else {
    response.success(req, res, 'Creado correctamente', 201)
  }
})

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), function () {
  console.log(`Running in port ${app.get('port')}`)
})


