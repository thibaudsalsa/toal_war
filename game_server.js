var vm = require("vm");
var fs = require("fs");
vm.runInThisContext(fs.readFileSync(__dirname + "/char_avion_soldat.js"))
/*global init_game add_unit add_unit_in del_unit*/

var game = init_game();
game.add = add_unit;
game.add_in = add_unit_in;
game.del = del_unit;