var vm = require("vm");
var fs = require("fs");
vm.runInThisContext(fs.readFileSync(__dirname + "/char_avion_soldat.js"));


var game = init_game();
game.team1.add("char", 2);
console.log(game.team1.unit);

