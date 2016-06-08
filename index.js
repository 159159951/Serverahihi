// khai b�o require module evilscan
var evilscan = require('evilscan')
// khai b�o require module express
,   express = require('express');

// kh?i t?o ?ng d?ng express
var app = express();

// ?ng d?ng port-scanning t? gi?i thi?u v? m�nh
app.get('/', function(req, res){
  res.send('<h1>Tui t�n l� port-scanning.<br>'+
    'Tui ch?y r?t nhanh v� r?t nguy hi?m.<br>'+
    '<a href="http://vietjs.com/?p=9">http://vietjs.com/2014/06/01/quet-cong-mang-sieu-nhanh-su-dung-node-js/</a></h1>');
});

// ?ng d?ng port-scanning l�m vi?c 
app.get('/port/scan', function (req, res) {
  var ips = req.query.ip
  ,   ports = req.query.port
  ,   options = {}
  ,   results = [];

  // ki?m tra l?i v� tr? v? th�ng b�o khi thi?u th�ng tin
  if (!ips || !ports) {
    res.send(400, 'Missing ip or port params. Correctly URL is /port/scan?ip=192.168.0.1&port=22');
    return;
  }

  // khai b�o options cho evilscan
  // xem th�ng tin d?y d? t?i https://github.com/eviltik/evilscan
  options = {
    target: ips, // d?a ch? IP, d�y IP
    port: ports, // c?ng
    status:'TROU', // ?
    banner: true, // hi?n th? bi?u ng? c?a c?ng k?t n?i
    concurrency: 255, // s? lu?ng k?t n?i d?ng th?i
    timeout: 2000, // th?i gian ch? k?t n?i (ms)
    geo: true, // x�c d?nh v? tr� d?a l� c?a d?a ch? IP
    reverse: true // hi?n th? th�ng tin reverse dns
  };;

  // kh?i t?o evilscan scanner
  var scanner = new evilscan(options, function () {
    // kh?i t?o xong scanner
  });
    
  // khi qu�t c� k?t qu?, luu k?t qu? v�o bi?n results
  scanner.on('result', function (data) {
    results.push(data);
  });

  // khi c� l?i, tr? v? th�ng b�o l?i
  scanner.on('error', function (err) {
    res.send(500, 'evilscan error: ' + err);
  });

  // khi qu�t xong, k?t th�c x? l� cho truy v?n n�y v� tr? v? k?t qu?
  scanner.on('done', function () {
    res.send(results);
  });

  // ch?y evilscan scanner
  scanner.run();
});

var HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT);
console.log('port-scanning application listening at 0.0.0.0:' + HTTP_PORT);