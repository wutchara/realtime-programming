// import * as stream from 'stream';
// import { promisify } from 'util';

// const finished = promisify(stream.finished);
const { Transform } = require('stream');
const express = require('express')
const app = express()
const port = 8080
let token = '';

const fs = require('fs')
try {
  token = fs.readFileSync('../token', 'utf8')
} catch (err) {
  console.error(err)
}
console.log('token.length', token.length);

app.get('/', (req, res) => {
  // res.send('Hello World!')
  let count = 0;
  setInterval(() => {
    res.write('\r\nHello World! => ' + count++);

    if (count > 10) {
      res.end();
    }
  }, 2000);
})

app.get('/tick-chart', (req, res) => {
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://api.refinitiv.com/data/historical-pricing/v1/views/events/BH.BK?adjustments=exchangeCorrection&sessions=normal&count=1000&qos=delayed&interval=PT1M&eventTypes=trade',
    headers: { 
      'Authorization': token
    }
  };

  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    res.json(response.data);
    console.log('Success response......');
  })
  .catch(function (error) {
    console.log(error);
  });

  // res.send('Hello World!')
})

app.get('/tick-chart-stream/:eventTypes', (req, res) => {
  const resultObject = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      this.push(chunk);
      callback();
    }
  });

  var axios = require('axios');
  // const writer = createWriteStream(outputLocationPath);

  var config = {
    responseType: 'stream',
    method: 'get',
    url: 'https://api.refinitiv.com/data/historical-pricing/v1/views/events/BH.BK?adjustments=exchangeCorrection&sessions=normal&count=1000&qos=delayed&interval=PT1M&eventTypes=' + req.params.eventTypes,
    headers: { 
      'Authorization': token,
      'x-ts-accept-chunks': 'application/json',
    }
  };

  // const urlReceiver = new Transform({
  //   readableObjectMode: true,
    
  //   transform(chunk, encoding, callback) {
  //     console.log('chunk => urlReceiver', chunk.toString());
  //     this.push(chunk.toString());
  //     callback();
  //   }
  // });

  // const arrayToObject = new Transform({
  //   readableObjectMode: true,
  //   writableObjectMode: true,
    
  //   transform(chunk, encoding, callback) {
  //     // let allStr = '';
  //     // for(let i=0; i < chunk.length; i++) {
  //     //   allStr += chunk[i];
  //     // }
  //     console.log('chunk => arrayToObject', chunk);
  //     this.push(chunk);
  //     callback();
  //   }
  // });

  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    // res.json(response.data);
    console.log('<stream> Success response......');
    // const result = await streamToString(response)
    // console.log('result', result);
    // return streamToString(response);
    
    // response.data
    // .pipe(urlReceiver)
    // .pipe(arrayToObject)
    // .pipe(resultObject)
    // .on('finish', () => console.log('Done'));

    // console.log('resultObject', resultObject);
    // res.pipe(response.data) => ERROR
    // res.end(response.data.pipe(res))
    // response.data.pipe(writer);

    // return finished(writer); //this is a Promise

    // const next = response.data;
    // console.log('next', next);

    // return axios({
    //   ...config,
    //   url: 'https://api.refinitiv.com' + ''
    // });
    // return new Promise((resolve, reject) => {
    //   console.log('<stream> <stream> Success response......');
    //   response.data.pipe(res)
    //   // response.data.pipe(writer);
    //   let error = null;
    //   res.on('error', err => {
    //     error = err;
    //     res.close();
    //     reject(err);
    //   });
    //   res.on('close', () => {
    //     if (!error) {
    //       resolve(true);
    //     }
    //     //no need to call the reject here, as it will have been called in the
    //     //'error' stream;
    //   });
    // });
    // console.log('stream', stream);

    function streamToString (stream) {
      const chunks = [];
      return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
          console.log('<streamToString>', 'data');
          // TODO: For multiple time response
          res.write(chunk.toString('utf8'));
          res.write('\r\n----------------------------------\r\n');
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

    // TODO: For one time response
    // streamToString(response.data).then(result => res.json(JSON.parse(result)));

    // TODO: For multiple time response
    streamToString(response.data).then(r => res.end());
  })
  .catch(function (error) {
    console.log('<stream>', error);
    res.send(error)
  });
})

app.get('/tick-chart-stream-recursion/:eventTypes', (req, res) => {
  const resultObject = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      this.push(chunk);
      callback();
    }
  });

  var axios = require('axios');
  const baseUrl = 'https://api.refinitiv.com';
  var config = {
    responseType: 'stream',
    method: 'get',
    url: baseUrl + '/data/historical-pricing/v1/views/events/BH.BK?adjustments=exchangeCorrection&sessions=normal&count=1000&qos=delayed&interval=PT1M&eventTypes=' + req.params.eventTypes,
    headers: { 
      'Authorization': token,
      'x-ts-accept-chunks': 'application/json',
    }
  };

  axios(config)
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

    // call onprem again
    const nextUrl = result.map(r => r?.meta?.next).filter(r => r);
    console.log('nextUrl', nextUrl);

    // can get directry
    const chunktUrl = [];
    result.map(r => {
      r.chunks.map(chunk => {
        chunktUrl.push({
          url: chunk.href,
          start: chunk.chunkStart,
        });
      });
    });
    console.log('chunktUrl', chunktUrl);

    // TODO: can reduce prcessing time
    // const resultChunks = (await Promise.all()).map(r => r.data);
    // console.log('resultChunks', resultChunks);

    const resultNexts = (await Promise.all([...chunktUrl.map(({url}) => {
      return axios({
        method: 'get',
        url,
        headers: { 
          'Authorization': token,
        },
      });
    }), ...nextUrl.map((url) => {
      return axios({
        method: 'get',
        url: baseUrl + url,
        headers: { 
          'Authorization': token,
        },
      });
    })])).map(r => r.data);
    console.log('resultNexts', resultNexts);
    resultNexts.map(resultNext => {
      resultNext.map(r => {
        result.push(r);
      });
    });

    // result.push(...resultChunks, ...resultNexts);
    // console.log('result', result);

    res.json(result)
  })
  .catch(function (error) {
    console.log('<stream>', error);
    res.send(error)
  });
})

app.get('/tick-chart-stream-x/:eventTypes', (req, res) => {
  var axios = require('axios');

  var config = {
    responseType: 'stream',
    method: 'get',
    url: 'https://api.refinitiv.com/data/historical-pricing/v1/views/events/BH.BK?adjustments=exchangeCorrection&sessions=normal&count=1000&qos=delayed&interval=PT1M&eventTypes=' + req.params.eventTypes,
    headers: { 
      'Authorization': token,
      'x-ts-accept-chunks': 'application/json',
    }
  };

  axios(config)
  .then(function (response) {
    console.log('<stream> Success response......');
    console.log('response type:', typeof response.data);
    console.log('response.data:', response.data);

    res.write(response.data);
  })
  .catch(function (error) {
    console.log('<stream>', error);
    res.end(error)
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})