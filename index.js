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
    const credentials = `${req.body.username}:${req.body.password}`

    try {
        const path = './data/credentials.txt'
        const contents = fs.readFileSync(path).toString()
        const credentialsDB = contents.split(/\r?\n/)        
        
        const found = credentialsDB.find(item => item === credentials) 
        
        // let found = null
        // for (let i = 0; i < credentialsDB.length; i++) {
        //     if (credentialsDB[i] === credentials) {
        //         found = true
        //         break
        //     }
        // }

        if (found) {
            try {
                const path = './data/leaderboard.txt'
                fs.writeFileSync(path, data)
                res.send('success!!!')
            } catch (err) {
                console.log('Eroare: ', err)
                res.status(500)
                res.send('Eroare!')
            }
        } else {
            console.log('Invalid credentials!')
            res.status(401)
            res.send('Invalid credentials!')
        }
    } catch (err) {
        console.log('Eroare: ', err)
        res.status(500)
        res.send('Eroare!')
    }       
})

app.use(express.static('public'))
 
app.listen(3000)
console.log('App running on http://localhost:3000')

