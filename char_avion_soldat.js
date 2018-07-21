/*global attack attack_city*/
function init_game()
{
	var game = new Object();
	//les trois equipe
	game.team1 = create_team();
	game.team2 = create_team();
	game.team3 = create_team();
	game.attack = attack;
	game.attack_city = attack_city;
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
		char.pv = 10,
		char.dmg = 0,
		char.speed = 0,
		char.color = 0,
		char.x = 0,
		char.y = 0,
		char.z = 0,	
        char.sizex = 0,
		char.sizey = 0,
		char.sizez = 0;
	return (char);
}

function create_soldat()
{
	var soldat = new Object();
		soldat.pv = 10,
		soldat.dmg = 0,
		soldat.speed = 0,
		soldat.color = 0,
		soldat.x = 0,
		soldat.y = 0,
		soldat.z = 0,	
        soldat.sizex = 0,
		soldat.sizey = 0,
		soldat.sizez = 0;
	return (soldat);
}

function create_avion()
{
	var avion = new Object();
		avion.pv = 10,
		avion.dmg = 0,
		avion.speed = 0,
		avion.color = 0,
		avion.x = 0,
		avion.y = 0,
		avion.z = 0,	
        avion.sizex = 0,
		avion.sizey = 0,
		avion.sizez = 0;
	return (avion);
}
