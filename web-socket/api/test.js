const ws = require('ws');

const client = new ws('ws://localhost:8000');

client.on('open', () => {
  // Causes the server to print "Hello"
  client.send('Hello');
});

client.on('message', (msg) => {
  console.log('Message frome server:', msg.toString());
});