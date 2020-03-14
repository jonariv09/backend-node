const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const routes = require('./network/routes')

app.set('port', 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
routes(app)

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), function () {
  console.log(`Running in port ${app.get('port')}`)
})
