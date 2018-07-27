/*global init_game*/

//creation du jeux
var game = init_game();
//creation du serveur avec les webSockets

function connect(name)
{
    var team = 0;
    if (game.team1.name === "")
    {
        game.team1.name = name;
        team = 1;
    }
    else if (game.team2.name === "")
    {
        game.team2.name = name;
        team = 2;
    }
    else if (game.team3.name === "")
    {
        game.team3.name = name;
        team = 3;
    }
    return (team);
}

function do_msg(team, message_get)
{
    var type;
    var nb;
    if (message_get.order === "buy" && message_get.type != "carte")
    {
        type = message_get.type;
        nb = message_get.nb;
        team.add(type, nb);
    }
    else if (message_get.order === "attack")
    {
        type = message_get.type;
        nb = message_get.nb;
        if (message_get.direction === "left")
            team.launch_left(type, nb);
        else if (message_get.direction === "right")
            team.launch_right(type, nb);
    }
    else if (message_get.type === "carte")
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
    msg.soldat = team.unit.soldat.length;
    msg.avion = team.unit.avion.length;
    msg.char = team.unit.char.length;
    msg.city = team.city;
    msg.argent = team.money;
}

function respond(game, team, start, ws)
{
    if (start === false || team === 0)
        return;
    var tmp;
    var msg = new Object();
    var msg_json;
    game.attack();
    game.attack_city();
    game.move();
    msg.team1 = game.team1;
    msg.team2 = game.team2;
    msg.team3 = game.team3;
    msg.soldat = 0;
    msg.char = 0;
    msg.avion = 0;
    msg.city = 0;
    msg.money = 0;
    game.team1.money += 0.034;
    game.team2.money += 0.034;
    game.team3.money += 0.034;
    switch (team) {
        case 1:
            tmp = game.team1;
        case 2:
            tmp = game.team2;
        case 3:
            tmp = game.team3;
    }
    fill_msg(msg, tmp);
    msg_json = JSON.stringify(msg);
    ws.send(msg_json);
}