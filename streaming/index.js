// import * as stream from 'stream';
// import { promisify } from 'util';

// const finished = promisify(stream.finished);
const { Transform } = require('stream');
const express = require('express')
const app = express()
const port = 8080
const token = 'Bearer eyJ0eXAiOiJhdCtqd3QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImJlcGpHV0dkOW44WU9VQ1NwX3M3SXlRMmlKMFkzeWRFaHo1VDJJVlNqWTgifQ.eyJkYXRhIjoie1wiY2lwaGVydGV4dFwiOlwiQlJuUXpXNW5BN0drSTVFUlFNOHY5aTFwNzMzUEFOYl9Xb0xwdFM1VWItaXo4Wkc1ZTB1MjlsS3hwdURoRElNWk9hSGQ1NkdYajl1clhiNmFBcUVzMUNlc0lic2xUTjVNdGN6VVRQbGxPNy1tc1RRTlhWZmhCMjFNU3VPdTRuQXg3VjZwZHQwbDFaTjc5azFRYUtPU1dXSExrc0RMcTRNbFNTcW9LbG53RmdReVJ0T3lzNjV1NVVBR3JTOXZTVWVvQVJ4dVg0Y1hVbkx3OXphY0s1UTNPZnhBXzloNmJtc2ZkSlhFdmpKMTBOemI2MEVYNlZMZDNYNGpDMDZqRDNvWHNmRF9NOFpra21ib1dKZlQzTUxzalV0ekdoOG41ckpucXIyLUdudk1ROWJFM0xuT0lrelhlQV9vclIzb3o3ZFNXLXFmc3dVZjFLRnJUSDVBWWtxblZicjJVYkxaejc2ZzBIZm1YVGNrY3FzbmdoV0doNE95dzQ1ZWc3NU1tZm1UbF9QbjVVVlZvZWxFdkVfYmxzWmk4aF9SMnQ0d29aVW9hWnlOTGY5VlZyTGM1R2o2TDh1ejNPelZPZVRPS3J4ZlcySzdEREpoelRNRm1DM0Z0aDVFc2E4VzFGRGYyNzU5MGVnSFB2dFZXaUhjUzdDV3J1VWY5SmowY1pUQU9jX0t3bnRhcmxXeVhldGtvMm01anFMUGJZMTFIWENWOG9RU1RPZzNrRC10TUQ1aUdORGJSdlFKUlJGZGJLMzhwUTlfRkl6M2pnaUp3RWxsRzhOdnl0SHp0NXY0SkotYkt4Qk01VjRuSjh6MDM0UVFUbUdKaU9wcnRRbUdfSDhDS01vbzZXNldsRGhCOUhneG56UkE5ZTFKTVl2ZFowcl9NNzRnWExaa0hWZjY0NlRrTzNCLVlveDlYdzlfUXBHSjNYVXBUYnM1dnJrSHEyWm1rNEV5MGVzRVM4Y0RTbTJmX011VmdvaUVpd2hkaUE2R1wiLFwiaXZcIjpcIkFST3QtZ1I3ZmJIcDh2YV9cIixcInByb3RlY3RlZFwiOlwiZXlKaGJHY2lPaUpCVjFOZlJVNURYMU5FUzE5Qk1qVTJJaXdpWlc1aklqb2lRVEkxTmtkRFRTSXNJbnBwY0NJNklrUkZSaUo5XCIsXCJyZWNpcGllbnRzXCI6W3tcImVuY3J5cHRlZF9rZXlcIjpcIkFRSUJBSGhMRzY1OF8ycWdSTERlcGx0LUtWOTFQLTJRUkhyY0tTMXZyN3IzV3JaQjlnSGlVUVhtV2dwTWN6OW5ySDdaYW04MkFBQUFmakI4QmdrcWhraUc5dzBCQndhZ2J6QnRBZ0VBTUdnR0NTcUdTSWIzRFFFSEFUQWVCZ2xnaGtnQlpRTUVBUzR3RVFRTUpWRF9vTVBxRFUzZzFTVEZBZ0VRZ0R2SXU0ZkJOaDFaT3l2RVpQSkhvWW92NEhJbkpXel9KWktsRDRUWmpTbVFDT0VURWlYT0p3d1JVRE1YMmFtdGVkM1c1Z19zZVEyXzJUT2NPd1wiLFwiaGVhZGVyXCI6e1wia2lkXCI6XCJhcm46YXdzOmttczphcC1zb3V0aGVhc3QtMTo4OTgwODQ5ODQ4Nzc6a2V5L2U0ODcwYjFjLTljYzctNDQ3OC1iOTUwLWM1NjU5YjVjNTY4ZlwifX0se1wiZW5jcnlwdGVkX2tleVwiOlwiQVFJQkFIaExHNjU4XzJxZ1JMRGVwbHQtS1Y5MVAtMlFSSHJjS1MxdnI3cjNXclpCOWdIaVVRWG1XZ3BNY3o5bnJIN1phbTgyQUFBQWZqQjhCZ2txaGtpRzl3MEJCd2FnYnpCdEFnRUFNR2dHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNSlZEX29NUHFEVTNnMVNURkFnRVFnRHZJdTRmQk5oMVpPeXZFWlBKSG9Zb3Y0SEluSld6X0paS2xENFRaalNtUUNPRVRFaVhPSnd3UlVETVgyYW10ZWQzVzVnX3NlUTJfMlRPY093XCIsXCJoZWFkZXJcIjp7XCJraWRcIjpcImFybjphd3M6a21zOmFwLXNvdXRoZWFzdC0xOjg5ODA4NDk4NDg3NzprZXkvZTQ4NzBiMWMtOWNjNy00NDc4LWI5NTAtYzU2NTliNWM1NjhmXCJ9fSx7XCJlbmNyeXB0ZWRfa2V5XCI6XCJBUUlDQUhpT1JjYVBoX2laM21rakVtUTZBaHpDOWJHeHJJNF9XaFZIWDVPRnI2NTgwUUZYSTZTX2x0aWQ2Q2lzQmoxcWkxZ2FBQUFBZmpCOEJna3Foa2lHOXcwQkJ3YWdiekJ0QWdFQU1HZ0dDU3FHU0liM0RRRUhBVEFlQmdsZ2hrZ0JaUU1FQVM0d0VRUU1DbzFsVnZWbHNXYXBiX04yQWdFUWdEc2IybGF0TlFLQlp3LWNLcllaYjRJdDNBUlI2OVRhS3NqaVJVUTA2SnM4OGtQTUxNOGxLRjJxbHM1ejJqY2owVVAwbzVKWEsyQmczeHlaTFFcIixcImhlYWRlclwiOntcImtpZFwiOlwiYXJuOmF3czprbXM6dXMtZWFzdC0xOjg5ODA4NDk4NDg3NzprZXkvMWZmZjY3OTMtNjVkZS00N2M0LWI3NjYtNzZjZDNjMTk0ZWYxXCJ9fV0sXCJ0YWdcIjpcIkZHbW5jUTFwT0JDa3RJbld4RkZ4SGdcIn0iLCJyczEiOiI4Nzk0ZmMxM2M0YjJmZWE5ZTAyYzYyYThjYzRmZTMzMGE4NTBjODUyIiwiYXVkIjoiYWQxMDJhMDdiMGFkNDM1ZTkzZWU3MzAwYmM0ZDAyNjYyYTIwZjUxZCIsImlzcyI6Imh0dHBzOi8vaWRlbnRpdHkuY2lhbS5yZWZpbml0aXYuY29tL2FwaS9pZGVudGl0eS9zdHNfcHJvZCIsImV4cCI6MTYzMTg2OTE3MCwiaWF0IjoxNjMxODY4NTcwfQ.CrNKU7il66QQnGMAFIr1nd75w04XULh_Y4S7abXV_vPjFOR6zh5CMiiJ8K7I3SJ8Lwd9gZpr4KIic98a01g6NutnIzh8C7eOC5QESoveYSnUSuwSkYx7Ix7K2s2aU2ZQjhxcCV2JAxWgykNNSGi46DEz8IGvtEUXX8lOMpZckHg0Z1CUSFW74H55Mb6ppWa5L1-4BKsotU_MnKNG-KC7IwRBvxP0HwI1PbEV1J7iic3_p5gSlseEazyr_xcsWC-7QEUAOMlBBqc-Rfd17BM8fnRcQxub9eItxHKU7fExTbrLu5DapmxMeFdNuG6iIX2x8SyZ7DQt3vh3jrCixAoT3Q'

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.write('Hello World!1')
  res.write('Hello World!2')
  res.write('Hello World!3')
  res.end()
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

  // var config = {
  //   responseType: 'stream',
  //   method: 'get',
  //   url: 'https://ap-southeast-1-historical-pricing-cdn.refinitiv.com/data/historical-pricing/v1/views/events/V?eventTypes=quote&start=2021-09-15T19:56:00.000000000Z&end=2021-09-16T00:00:00.000000000Z&adjustments=exchangeCorrection,manualCorrection&sessions=normal&id=ODFCRTk0N0QyNjMwOTIyNjI4MDZCODM1MzMwRTVGQzk4RjBGQzBFQzM4RDVCM0FCMzk4MDM3OTQxNDQxNzQ1N3xCODBBNUFCRkVDMjc2OTFDRTg1NTIzOEQzMzg4NzAxQ0JDOTg4MTlFQ0FCOEZEOTU0QTI1NUZGRkIxREJDQkEwfDA=&Expires=1631776214&Signature=dUntDWeBeEZs8OG342qhOMsuBtVVvlHV7tUoB49WcLBx0AXeFgkC+jTPkZFIRS/NbyNhVuwqFblgyj3V3Vc9ybROj2orf5inYuUFs5712v0OlUlWQLzMwL0JiXCif447Qab6yHbVkeAlNWS684DOSbIQ5t9oMaXnFon2BHpbMvB2170B3bJYkdLMXCDh0buLvCwm91I3RNdaTtHELgb3dNPJ470E6V5OIIXwH0qj+3ou7YBgU9siaW3FpvmphoA8C2dS3cWrmSKSylg2ngqnwcd45EsnfCVVSk6MQ8+7K7Q2ErDnT0xaYNxjrflWbDyT4NecTPIY+nUTtM5nQYRkyg==&Key-Pair-Id=APKAIYN64QKL2EVZPL2Q',
  // };

  

  const urlReceiver = new Transform({
    readableObjectMode: true,
    
    transform(chunk, encoding, callback) {
      console.log('chunk => urlReceiver', chunk.toString());
      this.push(chunk.toString());
      callback();
    }
  });

  const arrayToObject = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    
    transform(chunk, encoding, callback) {
      // let allStr = '';
      // for(let i=0; i < chunk.length; i++) {
      //   allStr += chunk[i];
      // }
      console.log('chunk => arrayToObject', chunk);
      this.push(chunk);
      callback();
    }
  });

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

    streamToString(response.data).then(result => res.json(JSON.parse(result)));
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