var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
var i = 0;
var answer = Math.floor(Math.random() * 21);
answer = parseInt(answer)
net.createServer(function (server) {
    console.log('CONNECTED: ' + server.remoteAddress + ':' + server.remotePort);
    server.on('data', function (data) {
        if (i == 0) {
            console.log('DATA Student => ' + data);
            server.write('OK');
            i = 1
        }
        if (data.toString() == answer.toString()) {
            server.write('BINGO');
            console.log('OLD VALUE : '+answer)
            answer = parseInt(answer)
            answer = Math.floor(Math.random() * 21);
            answer = parseInt(answer)
            console.log('NEW VALUE : '+answer)
        }
        else {
            server.write('ผิดจ้าา');
        }
    });

    server.on('close', function (data) {
        console.log('CLOSED: ' + server.remoteAddress + ' ' + server.remotePort);
    });
    server.on('error', () => {
    })
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);