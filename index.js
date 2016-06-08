// khai báo require module evilscan
var evilscan = require('evilscan')
// khai báo require module express
,   express = require('express');

// khởi tạo ứng dụng express
var app = express();

// ứng dụng port-scanning tự giới thiệu về mình
app.get(/.*$/, function(req, res){
  res.send(req.URL);
});


var HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT);
console.log('port-scanning application listening at 0.0.0.0:' + HTTP_PORT);