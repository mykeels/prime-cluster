const express = require('express')
const os = require('os')
const app = express()
const workerFarm = require('worker-farm')
const worker = workerFarm(require.resolve('./worker.js'))

app.get('/', (req, res) => {
    const max = Number(req.query.max) || 1000
    worker(max, (err, primes) => {
        if (err) res.status(500).send(err)
        else res.json(primes)
    })
})

app.listen(process.env.PORT || 3030)

console.log('app is running!')

module.exports = app