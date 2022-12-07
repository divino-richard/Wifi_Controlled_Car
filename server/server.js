
const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 5000 }, () => {console.log('Socket running on port: 5000')})

wss.on('connection', ws => {
  ws.on('message', message => {
    wss.broadcast(message);
  })

  // ws.send('Node Server Is Ready');
});

wss.broadcast = function broadcast(msg) {
  wss.clients.forEach(function each(client) {
    console.log(msg)
    client.send(msg);
  });
};

