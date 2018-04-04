# Primes

A simple API to retrieve a list of prime numbers between 1 and a supplied limit.

## Cluster Mode

This program runs in cluster mode. It determines the number of available CPU cores and makes forks of itself to run on each of these cores.

## Installation

```bash
git clone https://github.com/mykeels/prime-cluster.git
cd prime-cluster
npm start
```

## Usage

- Open `http://localhost:3030` in your browser

To specify a maximum prime number limit, supply the `max` query string in your request e.g. `http://localhost:3030?max=20000` to get prime numbers between `1` and `20,000`.