const express = require('express');
const ws = require('ws');
const app = express();

let token = '';

const fs = require('fs')
try {
  token = fs.readFileSync('../token', 'utf8')
} catch (err) {
  console.error(err)
}
console.log('token.length', token.length);

var axios = require('axios');
const baseUrl = 'https://api.refinitiv.com';

var config = {
  responseType: 'stream',
  method: 'get',
  url: baseUrl + '/data/historical-pricing/v1/views/events/BH.BK?adjustments=exchangeCorrection&sessions=normal&count=1000&qos=delayed&interval=PT1M&eventTypes=quote',
  headers: { 
    'Authorization': token,
    'x-ts-accept-chunks': 'application/json',
  }
};

function loadData() {
  return axios(config)
  .then(async function (response) {
    console.log('<stream> Success response......');

    function streamToString (stream) {
      const chunks = [];
      return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
          console.log('<streamToString>', 'data');
          chunks.push(Buffer.from(chunk))
        });
        stream.on('error', (err) => {
          console.log('<streamToString>', 'error');
          reject(err)
        });
        stream.on('end', () => {
          console.log('<streamToString>', 'end');
          resolve(Buffer.concat(chunks).toString('utf8'))
        });
      })
    }

    const result = JSON.parse(await streamToString(response.data));
    console.log('result', result);

    // TODO: // call onprem again
    // const nextUrl = result.map(r => r?.meta?.next).filter(r => r);
    // console.log('nextUrl', nextUrl);

    // // can get directry
    // const chunktUrl = [];
    // result.map(r => {
    //   r.chunks.map(chunk => {
    //     chunktUrl.push({
    //       url: chunk.href,
    //       start: chunk.chunkStart,
    //     });
    //   });
    // });
    // console.log('chunktUrl', chunktUrl);

    // const resultNexts = (await Promise.all([...chunktUrl.map(({url}) => {
    //   return axios({
    //     method: 'get',
    //     url,
    //     headers: { 
    //       'Authorization': token,
    //     },
    //   });
    // }), ...nextUrl.map((url) => {
    //   return axios({
    //     method: 'get',
    //     url: baseUrl + url,
    //     headers: { 
    //       'Authorization': token,
    //     },
    //   });
    // })])).map(r => r.data);
    // console.log('resultNexts', resultNexts);
    // resultNexts.map(resultNext => {
    //   resultNext.map(r => {
    //     result.push(r);
    //   });
    // });

    return result;
  })
  .catch(function (error) {
    console.log('<stream>', error);
    return error;
  });
}



// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', socket => {
  // sent to client
  socket.send('Connected.');
  socket.send('..............');

  setInterval(async () => {
    socket.send('........Checking Connection........');
    const x = await loadData();
    socket.send(JSON.stringify(x));
  }, 5000);

  // message incomming to server
  socket.on('message', message => {
    console.log('received: %s', message.toString());
  });
});

const server = app.listen(8000, () => {
  console.log('opened server on', server.address().port);
});
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
