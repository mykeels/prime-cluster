const isPrime = require('./is-prime')

module.exports = function (max = 0, callback = (err, result) => ({})) {
    try {
        const primes = []

        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) primes.push(i)
        }
        
        callback(null, primes)
    }
    catch (ex) {
        callback(ex)
        console.error(ex)
    }
}