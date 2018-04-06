const express = require('express')
const crypto = require('crypto')
const isPrime = require('./is-prime')
const app = express()

const calculateHash = function (req, res, buf, encoding){
    const hash = crypto.createHash('sha1')
    hash.setEncoding('hex')
    hash.write(buf.toString(encoding || 'utf8'))
    hash.end()
    var sha1sum = hash.read()
    req.hash = sha1sum
}

const textBodyParser = require('body-parser').text({ verify: calculateHash })

app.post('/', textBodyParser, (req, res) => {
    res.send(req.hash)
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