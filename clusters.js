const cluster = require('cluster')
const os = require('os')

if (cluster.isMaster) {
    const cpuCount = os.cpus().length
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork()
    }
}
else {
    const app = require('./index')

    app.get('/info', (req, res) => {
        res.json({
            id: cluster.worker.id
        })
    })
}

cluster.on('exit', (worker) => {
    console.log('mayday! mayday! worker', worker.id, ' is no more!')
    cluster.fork()
})