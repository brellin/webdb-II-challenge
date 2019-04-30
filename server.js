const express = require('express')
const helmet = require('helmet')

const router = require('./router')

const server = express()


server.use(express.json());
server.use(helmet());

server.use('/api/zoos', router)

module.exports = server
