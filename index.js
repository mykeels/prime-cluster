const express = require('express')
const isPrime = require('./is-prime')
const app = express()

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