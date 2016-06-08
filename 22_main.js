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
var server = http.createServer(function (req, res) {
/* 	console.log('\r\nDEBUG===\r\n');
	console.log(req.url);
	console.log(req.body);
	console.log('\r\nEND DEBUG===\r\n'); */
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
server.listen(80);
console.log('Server running on port: 80');
