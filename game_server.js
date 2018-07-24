var vm = require("vm");
var fs = require("fs");
vm.runInThisContext(fs.readFileSync(__dirname + "/char_avion_soldat.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/fight.js"));

/*global init_game*/

var game = init_game();
game.team1.add("char", 2);
game.team1.launch_left("char", 1);
game.team1.launch_right("char", 1);
game.attack_city();
console.log(game.team1.unit);

var message_post = JSON.stringify(game);
var message_get;

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