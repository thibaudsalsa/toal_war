var vm = require("vm");
var fs = require("fs");
vm.runInThisContext(fs.readFileSync(__dirname + "/char_avion_soldat.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/fight.js"));

/*global init_game*/

//creation du jeux
var game = init_game();
//creation du serveur avec les webSockets
var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 40510});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message);
      ws.send("start");
  });
});

function connect(team, game)
{
    if (game.team1.name === "")
    {
        game.team1.name === team;
        team = 1;
    }
    else if (game.team2.name === "")
    {
        game.team2.name === team;
        team = 2;
    }
    else if (game.team3.name === "")
    {
        game.team3.name === team;
        team = 3;
    }
    return (team);
}

function do_msg(team, message_get)
{
    var type;
    var nb;
    if (message_get.order === "buy")
    {
        type = message_get.type;
        nb = message_get.nb;
        this.add_unit(type, nb);
    }
    else if (message_get.order === "attack")
    {
        type = message_get.type;
        nb = message_get.nb;
        if (message_get.direction == "left")
        this.launch_right(type, nb);
        if (message_get.direction == "right")
        this.launch_right(type, nb);
    }
    else if (message_get.order == "card")
    {
        if (message_get.order === "buy")
        {
            //get card
        }
        else if (message_get.order === "use")
        {
            nb = message_get.nb;
            //use card
        }
    }
}

function fill_msg(msg, team)
{
    msg.soldat = team.unit.soldat;
    msg.avion = team.unit.avion;
    msg.char = team.unit.char;
    msg.city = team.city;
}

function respond(game, team)
{
    var tmp;
    var msg = new Object();
    var msg_json;
    msg.team1 = game.team1;
    msg.team2 = game.team2;
    msg.team3 = game.team3;
    msg.soldat = 0;
    msg.char = 0;
    msg.avion = 0;
    msg.city = 0;
    switch (team) {
        case '1':
            tmp = game.team1;
        case '2':
            tmp = game.team2;
        case '3':
            tmp = game.team3;
    }
    fill_msg(msg, tmp);
    msg_json = JSON.stringify(msg);
    return (msg_json);
}