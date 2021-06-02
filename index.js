const express = require('express')
const fs = require('fs')
const app = express()
 
app.get('/', function (req, res) {
    res.send('Hello World using Nodemon')
})

app.use(express.static('public'))
 
app.listen(3000)
console.log('App running on http://localhost:3000')
