/*global attack attack_city move_unit launch_right launch_left*/
function init_game()
{
	var game = new Object();
	//les trois equipe
	game.team1 = create_team();
	game.team2 = create_team();
	game.team3 = create_team();
	game.attack = attack;
	game.attack_city = attack_city;
	game.move = move_unit;
	game.card = init_card();
	return (game);
}

function create_team()
{
	var team = new Object();
	team.player = "";
	team.color = "";
	team.money = 200;
	team.city = 200;
	team.carte = [];
	team.unit = create_team_unit();
	team.add = add_unit;
	team.launch_right = launch_right;
	team.launch_left = launch_left;
	team.use_card = use_card;
	return (team);
}

function create_team_unit()
{
	var team_unit = new Object();
	//unité dans la caserne
	team_unit.char = [];
	team_unit.soldat = [];
	team_unit.avion = [];
	//unité qui attack a gauche
	team_unit.unit_left = new Object();
	team_unit.unit_left.char = [];
	team_unit.unit_left.soldat = [];
	team_unit.unit_left.avion = [];
	//unité qui attack a droite
	team_unit.unit_right = new Object();
	team_unit.unit_right.char = [];
	team_unit.unit_right.soldat = [];
	team_unit.unit_right.avion = [];
	return (team_unit);
}

function add_unit(type, nbr)
{
	for (let i = 0; i < nbr && type == "char"; i++)
		this.unit.char.push(create_char());
	for (let i = 0; i < nbr && type == "avion"; i++)
		this.unit.avion.push(create_avion());	
	for (let i = 0; i < nbr && type == "soldat"; i++)
		this.unit.soldat.push(create_soldat());
}

function create_char()
{
	var char = new Object();
	char.pv = 3;
	char.dmg = 1;
	char.speed = 1;
	char.color = 0;
	char.x = 0;
	char.y = 0;
	char.z = 0;
	char.hit = 0;
	return (char);
}

function create_soldat()
{
	var soldat = new Object();
	soldat.pv = 1;
	soldat.dmg = 3;
	soldat.speed = 1;
	soldat.color = 0;
	soldat.x = 0;
	soldat.y = 0;
	soldat.z = 0;
	soldat.hit = 0;
	return (soldat);
}

function create_avion()
{
	var avion = new Object();
	avion.pv = 1;
	avion.dmg = 1;
	avion.speed = 3;
	avion.color = 0;
	avion.x = 0;
	avion.y = 0;
	avion.z = 0;
	avion.hit = 0;
	return (avion);
}
