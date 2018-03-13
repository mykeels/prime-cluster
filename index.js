const express = require('express')
const os = require('os')
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

app.get('/cpus', (req, res) => {
    res.json(os.cpus())
})

const storage = []

app.get('/factorial', (req, res) => {
    const rootUrl = (url) => req.protocol + '://' + req.get('host') + url;
    const id = storage.length + 1;
    setTimeout(() => {
        let sum = 1;
        for (let i = Number(req.query.value) || 1; i >= 1; i--) {
            sum *= i
        }
        storage.push(sum)
        if (!res.headersSent) res.json({ factorial: sum })
    }, 10000) //delay for 10 seconds

    setTimeout(() => {
        if (!res.headersSent) {
            res.status(202).json({ 
                    location: rootUrl('/factorial/' + id)
            })
        }
    }, 500) //interrupt response after 500 ms
})

app.get('/factorial/:id', (req, res) => {
    let id = Number(req.params.id)

    if (!!id) {
        if (storage[id - 1]) {
            res.json({
                factorial: storage[id - 1]
            })
        }
        else {
            res.status(202).send({ message: 'please wait' })
        }
    }
})

app.listen(process.env.POST || 3030)

console.log('app is running!')

module.exports = app