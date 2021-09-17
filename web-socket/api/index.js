const express = require('express');
const ws = require('ws');
const app = express();


var axios = require('axios');
const token = 'Bearer eyJ0eXAiOiJhdCtqd3QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImJlcGpHV0dkOW44WU9VQ1NwX3M3SXlRMmlKMFkzeWRFaHo1VDJJVlNqWTgifQ.eyJkYXRhIjoie1wiY2lwaGVydGV4dFwiOlwiQ243YjRWRzFyU0hyNG1Zam1uNHo3QUdfeXZabDRieE5ENFJLMkJpMnhYM0V3YlJzSXdxUkFmZHNJVW5hWWtMVzZBdkhwc3BYUld1cHd2QXo2cU81X09NQklvbzJSTVRRbEFwb2tqWmVaUUR1LVd1OU5ydDRxRUtiRlZEc0Nva2Q1MjhvMUxmdGdkckJUbGtQdE9YSEdmRy00YkM0R19kcy1QZlZqRFpMYjhDWFpYUzZPTVk1XzZrVVVDZXhCZVJRN0ZwLXFjY3JrYm11RmpubnltQURWa29abVB6VFF2NWd0Y1JnS1ZoaDNfeF84S0txMG85RllxSXVsaTlnOTF2UTdQUVpYeTZKemFHb2liSkQwUmRYS2JPb1FkY2RlZUdNc1pkQ3BRczhLdkJ6eVZTcEk3dThnS2w4b2VPTTRqY3V4QlQ3VXM5T0xyMG1XVlUtLTZKUG15bEtZLXFpOGpvX3o2WVVkSUh1YlRQRG5rTTFLZGdBR3VTSEhGb1BJRksxYjk2MkZiUDIyazRfYXdfN1NjTVgtVF9hWnB6bEdPY3JSV3dGNEpKU0JSZVFLNi1HcVlYdXltZk9PRm5rUkJ0ZVFGY1lndUhVWEZSWXh1dDZKYVp3MV9rMm9aazZDdzQ0ZkE4R0p0ZVlTbDhmSEJRSDRTVTBXdmo3ay0xQlQwNExKSk9YckNkeVlRNFRZQllfME9nOUdvVGZNSUMwMHpOVWUtLTlnVmQ4SFd0eEtfOFJYVjc5QzlrVXFncXRhdTlpWm1iOXZRTkJta3U4dXZvYVRPT29uRUhxVnhCS0piTUhsZjJIX1NRSFZHOFdTMjJyVm1tdm5GaHlKNFRjTE5ybnRFVUVodnU4UUYwYkdrOGlqb1hoT29ycXgzUG1vYTFkMExvN2tmTHlrS2ZhY1drVlJLUXJYQ3pFMThyMGFVdFVyRzlwQ2VrZVVJRGxXRlBBcWViSDZHNDFiSnFCUWNXUHJWNXpqc3hOZnExMlwiLFwiaXZcIjpcIkVfblpCSVIydms2VmVSWlZcIixcInByb3RlY3RlZFwiOlwiZXlKaGJHY2lPaUpCVjFOZlJVNURYMU5FUzE5Qk1qVTJJaXdpWlc1aklqb2lRVEkxTmtkRFRTSXNJbnBwY0NJNklrUkZSaUo5XCIsXCJyZWNpcGllbnRzXCI6W3tcImVuY3J5cHRlZF9rZXlcIjpcIkFRSUJBSGhMRzY1OF8ycWdSTERlcGx0LUtWOTFQLTJRUkhyY0tTMXZyN3IzV3JaQjlnSGt6U01EU1Eyc1lPTU5HRUVWbFoyM0FBQUFmakI4QmdrcWhraUc5dzBCQndhZ2J6QnRBZ0VBTUdnR0NTcUdTSWIzRFFFSEFUQWVCZ2xnaGtnQlpRTUVBUzR3RVFRTWhRN0RCbmRZMzJpU09tOENBZ0VRZ0R0a2s3MkFwTXViME5JblowV2ZaaklNeWI1M0M0aklaQnMwNmNKQ1BoSGxxYWlHeVpJNVJMalBiQXpuY0VRYjJrdGdzSENReFNOOS02V2FvUVwiLFwiaGVhZGVyXCI6e1wia2lkXCI6XCJhcm46YXdzOmttczphcC1zb3V0aGVhc3QtMTo4OTgwODQ5ODQ4Nzc6a2V5L2U0ODcwYjFjLTljYzctNDQ3OC1iOTUwLWM1NjU5YjVjNTY4ZlwifX0se1wiZW5jcnlwdGVkX2tleVwiOlwiQVFJQkFIaExHNjU4XzJxZ1JMRGVwbHQtS1Y5MVAtMlFSSHJjS1MxdnI3cjNXclpCOWdIa3pTTURTUTJzWU9NTkdFRVZsWjIzQUFBQWZqQjhCZ2txaGtpRzl3MEJCd2FnYnpCdEFnRUFNR2dHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNaFE3REJuZFkzMmlTT204Q0FnRVFnRHRrazcyQXBNdWIwTkluWjBXZlpqSU15YjUzQzRqSVpCczA2Y0pDUGhIbHFhaUd5Wkk1UkxqUGJBem5jRVFiMmt0Z3NIQ1F4U045LTZXYW9RXCIsXCJoZWFkZXJcIjp7XCJraWRcIjpcImFybjphd3M6a21zOmFwLXNvdXRoZWFzdC0xOjg5ODA4NDk4NDg3NzprZXkvZTQ4NzBiMWMtOWNjNy00NDc4LWI5NTAtYzU2NTliNWM1NjhmXCJ9fSx7XCJlbmNyeXB0ZWRfa2V5XCI6XCJBUUlDQUhoV3ZjSFhyTVlXVXlkVnJsZzV1TWxfUWlINmdLdHNabmRYQlgyakhuNjkzd0VmR0pFQjBQZVhiMktpQmJTOXhWcjlBQUFBZmpCOEJna3Foa2lHOXcwQkJ3YWdiekJ0QWdFQU1HZ0dDU3FHU0liM0RRRUhBVEFlQmdsZ2hrZ0JaUU1FQVM0d0VRUU1Tc1k5SXlncF9qUHJUZzYzQWdFUWdEdmd4bUJQTDZidnVkMHBWTUluQ3ZSX3pPVjR0MnRLXzRvb2hOVEpab3BDZ05FNVFBeUl1eGRDWkF2TkxkQmtya1FYRG9haVpQWW5sc2NGMVFcIixcImhlYWRlclwiOntcImtpZFwiOlwiYXJuOmF3czprbXM6ZXUtd2VzdC0xOjg5ODA4NDk4NDg3NzprZXkvNmE4NjU5MmYtMzYxNC00ODE2LTljNDMtODExYmVmZGE2ZDYwXCJ9fV0sXCJ0YWdcIjpcInkyX3dOQ3I1WmZiRzVDVW5Rbi1ZeUFcIn0iLCJyczEiOiIyNjNmODA5MzAzMmUxZDgyN2VjMWIzOWRkOTJjMzI1MzdjNDA3MWFlIiwiYXVkIjoiYWQxMDJhMDdiMGFkNDM1ZTkzZWU3MzAwYmM0ZDAyNjYyYTIwZjUxZCIsImlzcyI6Imh0dHBzOi8vaWRlbnRpdHkuY2lhbS5yZWZpbml0aXYuY29tL2FwaS9pZGVudGl0eS9zdHNfcHJvZCIsImV4cCI6MTYzMTg2OTg3MiwiaWF0IjoxNjMxODY5MjcyfQ.AW4a6D1g9U8xjSAaIvZzAGtZYRNgpYAN0ZtIgf5UWfxxsUS6VBRxSNGY595fIj1MOlICeeFlpv_Pl0jttdUXHlRvnN-JoycUZogNUZeuvAznx0ZfCg5KjxWL36QTdAzmrbIlF46RXxjG1zo1HRr8VfUSqK4EwNiL7zqRHN2V_JHJEr36oU-urTbQVFb1FqjQQAdFS6yOz84uVOhq1TFYeI5o674nbLmAxl_MMYWBCMJ49a02TvMMlOtdCA7pSSkV0VB3O6RJcd3sNoYnt1hwX5TfGOvtsEHohPnMyYRtjj9TntIN9i8oo-zQVeNhgRP3WSXO18WuSfSDL8YCGUEj2w'
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
