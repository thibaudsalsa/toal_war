var fs = require("fs");
var vm = require("vm");
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 40510});

vm.runInThisContext(fs.readFileSync(__dirname + "/fight.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/char_avion_soldat.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/game_server.js"));

/*global connect do_msg game:true respond init_game*/
var start = false;

//quand quelqu'un ce connect
wss.on('connection', function (ws)
{
  ws.me = 0;
  //quand le server recoit un message
  ws.on('message', function (message)
  {
    message = JSON.parse(message);
    console.log("team" + ws.me + " send: ");
    console.log(message);
    if (message.order === "connect" /*&& ws.me === 0*/)
    {
      ws.me = check_connection(message.msg);
      console.log('someone connect');
    }
    else if (start === true)
      interpret_msg(ws.me, message);
  });
  //quand un client se deconnect le jeux ce reset
  ws.on('close', function(message)
  {
    start = false;
    game = init_game();
    wss.broadcast("reset");
  });
  // 10 fois par secondes le serveur actualise et envoit les infos aux clients
    setInterval(() => respond(game, ws.me, start, ws), 40);
});

function check_connection(name)
{
  var me = connect(name);
  if (me === 3)
  {
    wss.broadcast("start");
    start = true;
  }
  return (me);
}

function interpret_msg(me, message)
{
  if (me === 1)
    do_msg(game.team1, message);
  else if (me === 2)
    do_msg(game.team2, message);
  else if (me === 3)
    do_msg(game.team3, message);
}

wss.broadcast = function broadcast(msg)
{
  wss.clients.forEach(function each(client)
  {
    client.send(msg);
  });
};