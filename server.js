const express = require('express')
const helmet = require('helmet')

const router = require('./router')
const bearsRouter = require('./bears')

const server = express()


server.use(express.json());
server.use(helmet());

server.use('/api/zoos', router)
server.use('/api/bears', bearsRouter)

module.exports = server
