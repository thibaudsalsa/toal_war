var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 40510});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message);
    try
    {
      ws.send("you are connected");
    }
    catch (er) {console.log("client disconected");}
  });
});
