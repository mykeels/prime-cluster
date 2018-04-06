const express = require('express')
const textBodyParser = require('body-parser').text()
const isPrime = require('./is-prime')
const app = express()

app.post('/', textBodyParser, (req, res) => {
    res.send(req.body.split('\n').map((line) => line.split('').reverse().join('')).join('\n'))
})

app.get('/', (req, res) => {
    const primes = []
    const max = Number(req.query.max) || 1000
    for (let i = 1; i <= max; i++) {
        if (isPrime(i)) primes.push(i)
    }
    res.json(primes)
})

app.listen(process.env.PORT || 3030)

console.log('app is running!')

module.exports = app