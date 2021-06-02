const express = require('express')
const fs = require('fs')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)
  
app.use(express.json())
 
app.get('/', function (req, res) {
    res.send('Hello World using Nodemon')
})

app.get('/read', function (req, res) {
    const path = './data/leaderboard.txt'
    let data
    try {
        data = fs.readFileSync(path)
        res.send(data.toString()) 
    } catch (err) {
        console.log('Eroare: ', err)
        res.status(500)
        res.send('Eroare!')
    }    
})

app.post('/write', function (req, res) {
    const data = req.body.payload.replace(/, /g, '\n')

    try {
        const path = './data/leaderboard.txt'
        fs.writeFileSync(path, data)
    } catch (err) {
        console.log('Eroare: ', err)
        res.status(500)
        res.send('Eroare!')
    }

    res.send(`Am primit: ${data}`)
})

app.use(express.static('public'))
 
app.listen(3000)
console.log('App running on http://localhost:3000')

