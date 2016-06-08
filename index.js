// khai báo require module evilscan
var evilscan = require('evilscan')
// khai báo require module express
,   express = require('express');

// khởi tạo ứng dụng express
var app = express();


// read file
var readline = require('readline');
var fileName = 'req-res_out.txt';
var http = require('http')
    , url = require('url')
    , fs = require('fs')
    , USERNAME = '/huyttq/'
    , layout = '/layouts'
    , device = '/accessories/0x0000'
    , group = '/groups'
    , preset = '/presets'
    , event = '/events';

var flgInit = true;
var LineArr = fs.readFileSync(fileName)
    .toString()
    .split("\n");

	
function sleep(mili){

	var start = new Date().getTime();
	for(;;){
		if((new Date().getTime() - start) > mili){
			break;
		}
	}
}



// ứng dụng port-scanning tự giới thiệu về mình
app.get(/.*$/, function(req, res){
  if (req.method == 'POST') {
		console.log("Receive Req: Type = Post");
        var body = '';

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
		    if(body == '{"pass":"a"}' ||body == 'pass=a' ){
			console.log("++++");
			console.log(body);
				res.statusCode = 200;
				sleep(1000);
				res.end();
			}
			else{
			console.log("----");
			console.log(body);
				res.statusCode = 404;
				sleep(1000);
				res.end();
			}
        });
    }else if (req.url.indexOf(USERNAME) == -1) {
		

 console.log("Receive Req: Type = GET");
        if (flgInit) {
            flgInit = false;
            for (i in LineArr) {
                console.log(LineArr[i]);
            }
            console.log("------------READ DATABASE SUCCESSFULL------------");
        }
        var str_Req = req.url;
        urlSubReq = str_Req;
        console.log('<<<<<' + urlSubReq);
		sleep(1000);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        if (urlSubReq.indexOf('/0x') > -1) {
            //Detail OR get all devices
            console.log('Response for ' + urlSubReq);
            // res detail
            for (i = 0; i < LineArr.length; i++) {
                if (LineArr[i].indexOf(urlSubReq) > -1) {
                    console.log('Res line ' + (i + 2))
                    console.log('>>>>>' + LineArr[i + 1]);
                    res.write(LineArr[i + 1]);
                    break;
                }
            }
        } else {
            // main page
            console.log('Response for ' + urlSubReq);
            for (i = 0; i < LineArr.length; i++) {
                if ((LineArr[i].indexOf(urlSubReq) > -1) && (LineArr[i].indexOf('0x') == -1)) {
                    console.log('Res line ' + (i + 2))
                    console.log('>>>>>' + LineArr[i + 1]);
                    res.write(LineArr[i + 1]);
                    break;
                }
            }
        }
        res.end();

    } else {
        console.log('user fail');
        res.statusCode = 404;
        res.end();
    }
});


var HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT);
console.log('port-scanning application listening at 0.0.0.0:' + HTTP_PORT);