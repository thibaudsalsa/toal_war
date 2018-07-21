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
