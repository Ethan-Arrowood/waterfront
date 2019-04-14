const fastify = require('fastify')
const path = require('path')

const server = fastify()

server.register(require('fastify-static'), {
  root: path.join(__dirname, '/public')
})

server.get('/', (request, reply) => {
  reply.sendFile('index.html')
})

server.listen(3000, '0.0.0.0', (err) => {
  if (err) console.error(err)
  console.log('Server running')
})