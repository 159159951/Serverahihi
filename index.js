// khai báo require module evilscan
var evilscan = require('evilscan')
// khai báo require module express
,   express = require('express');

// kh?i t?o ?ng d?ng express
var app = express();

// ?ng d?ng port-scanning t? gi?i thi?u v? mình
app.get('/', function(req, res){
	 if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
		    if(body == '{"pass":"a"}' ||body == 'pass=a' ){
				res.statusCode = 200;
				sleep(1000);
				res.end();
			}
			else{
				res.statusCode = 404;
				sleep(1000);
				res.end();
			}
        });
    }else if (req.url.indexOf(USERNAME) == -1) {
        if (flgInit) {
            flgInit = false;
        }
        var str_Req = req.url;
        urlSubReq = str_Req;
		sleep(1000);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        if (urlSubReq.indexOf('/0x') > -1) {
            // res detail
            for (i = 0; i < LineArr.length; i++) {
                if (LineArr[i].indexOf(urlSubReq) > -1) {
                    res.write(LineArr[i + 1]);
                    break;
                }
            }
        } else {
            // main page
            for (i = 0; i < LineArr.length; i++) {
                if ((LineArr[i].indexOf(urlSubReq) > -1) && (LineArr[i].indexOf('0x') == -1)) {
                    res.write(LineArr[i + 1]);
                    break;
                }
            }
        }
        res.end();

    } else {
        res.statusCode = 404;
        res.end();
    }
});

var HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT);