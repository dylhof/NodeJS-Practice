const http = require('http')

const port = 3000

const server = http.createServer()

server.listen(port, () => {
  console.log(`The HTTP server is running on port ${port}.`)
})

const messages = [
  { 'id': 1, 'user': 'Dylan Hofmann', 'message': 'Love Node JS!' },
  { 'id': 2, 'user': 'Leta', 'message': 'Servers are cool!' },
  { 'id': 3, 'user': 'Will', 'message': 'Love a good Test suit!' }
]

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response)
  } else if (request.method === 'POST') {
    let newMessage
    request.on('data', (data) => {
      newMessage = {
        id: new Date(), 
        ...JSON.parse(data)
      }
    })
    request.on('end', () => {
      addMessage(newMessage, response)
    })
  }
})

const getAllMessages = (response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(messages))
  response.end()
}

const addMessage = (newMessage, response) => {
  response.statusCode = 201
  response.setHeader('Content-Type', 'application/json')
  messages.push(newMessage)
  response.write(JSON.stringify(messages))
  response.end()
}