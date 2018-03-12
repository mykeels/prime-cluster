const express = require('express')
const os = require('os')

const app = express()

app.get('/', (req, res) => {
    for (let i = 0; i <= 20000000; i++) {
        
    }
    res.send('Hello World')
})

app.get('/cpus', (req, res) => {
    res.json(os.cpus())
})

app.listen(process.env.POST || 3030)

console.log('app is running!')

module.exports = app