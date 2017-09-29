const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

var i = 0;
var timerId = 0;

io.sockets.on('connection',　function (socket){
  socket.on('user-ready', function(data){
    console.log(data);
    socket.userid = i++;
      if(socket.userid<=2){
          timerId = setInterval(function(){
            io.emit('data-request');
            io.emit('ball_data-request');
          } ,150);

        }
        socket.emit('user-id', socket.userid);
        //console.log('data');
    });
    socket.on('red_bar', function(data){
      socket.broadcast.emit('red_bar' , data);
      console.log("zahyou");
      console.log(data);
    });
    
    socket.on('ball', function(data){
      socket.broadcast.emit('ball' , data);
    });

});


    //socket.on('emit_from_client',　function(data) {
//         //io.sockets.emit('emit_from_server' , ' ['  + socket.id + ': ] ' )
        //http.listen(port, () => console.log('listening on port ' + port));
//       //io.socket.emit('emit_from_server' , 'hello_from_server: ' + data);
http.listen(port, () => console.log('listening on port ' + port));
