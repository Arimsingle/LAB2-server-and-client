var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var i = 0;
var round = 0;
var client = new net.Socket();
client.connect(PORT, HOST, function () {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write('6035512059');
});

client.on('data', function (data) {
    if (data.toString() == 'OK') {
        console.log('DATA : ' + data)
    }
    if (round < 5) {
        let answer = Math.floor(Math.random() * 21);
        answer = parseInt(answer)
        answer = answer.toString()
        client.write(answer);
        if (data.toString() == 'BINGO') {
            console.log('BINGO')
            client.destroy();
        }
        else if(data.toString() != 'OK') {
            console.log(data.toString())
        }
    }
    else {
        client.destroy();
    }
    round++;
    //client.destroy();
});

// Add a 'close' event handler for the client socket
client.on('close', function () {
    console.log('Connection closed');
});
