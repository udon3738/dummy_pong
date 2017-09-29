'use strict'
enchant();

window.onload = function(){
  var socket = io();
  var game = new Core(700,500);

  console.log("connected");
  socket.emit('user-ready');
  socket.on('user-id' , function(data){
    console.log(data);
//    socket.emit('user-join' , data);
  });


  game.fps = 15;
  game.preload("red.png", "blue.png", "ball.png");

  game.onload = function(){

    var red_bar  = new Sprite(41, 166);
    var blue_bar = new Sprite(41, 166);
    var ball = new Sprite(129,129);

    red_bar.scale(0.6,0.7);
    blue_bar.scale(0.7,0.7);
    ball.scale(0.3,0.3);

    red_bar.image = game.assets["red.png"];
    blue_bar.image = game.assets["blue.png"];
    ball.image = game.assets["ball.png"];

    red_bar.x = 50;
    red_bar.y = 250;
    blue_bar.x = 650;
    blue_bar.y = 250;
    ball.x = 400;
    ball.y = 250;

    game.rootScene.backgroundColor = "black";


    game.rootScene.addChild(red_bar);
    game.rootScene.addChild(blue_bar);
    game.rootScene.addChild(ball);

    socket.on('red_bar' , function(data){
      blue_bar.x = 700-data.x;
      blue_bar.y = data.y;
      console.log(data);
//      {x:????,y:???}
    });
    socket.on('data-request' , function(data){
      socket.emit('red_bar' , {
        x:red_bar.x,
        y:red_bar.y
      });
    
      //console.log("Hi");
    });
    
    socket.on('ball_data-request' ,function(ball_data){
      socket.emit('ball_data' ,{
        x:ball.x,
        y:ball.y
      });
    });
    
    var flag = false;

    red_bar.addEventListener("enterframe", function(){

      if(game.input.left)  this.x -= 5;
      if(game.input.right) this.x += 5;
      if(game.input.up)    this.y -= 5;
      if(game.input.down)  this.y += 5;
 
      if(flag==true){
        ball.x += 5;
        if(ball.x>=700) flag = false;
      }else if(flag==false){
        ball.x -= 5;
        if(ball.x<=0)   flag = true;
      }


    });


  };
  game.start();

};
