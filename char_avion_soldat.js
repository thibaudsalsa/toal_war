/*global attack attack_city move_unit launch_right launch_left*/
function init_game()
{
	var game = new Object();
	//les trois equipe
	game.team1 = create_team(0, 0, 200);
	game.team2 = create_team(253, 106, 2);
	game.team3 = create_team(200, 0, 0);
	game.attack = attack;
	game.attack_city = attack_city;
	game.move = move_unit;
	return (game);
}

function create_team(r, g, b)
{
	var team = new Object();
	team.name = ""
	team.player = "";
	team.color = "";
	team.money = 50;
	team.city = 6000;
	team.carte = [];
	team.r = r;
	team.g = g;
	team.b = b;
	team.unit = create_team_unit();
	team.add = add_unit;
	team.launch_right = launch_right;
	team.launch_left = launch_left;
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
	if (this.unit.soldat.length + this.unit.char.length + this.unit.avion.length < 100 && this.money >= 5)
	{
		this.money -= 5;
		for (let i = 0; i < nbr && type == "char"; i++)
			this.unit.char.push(create_char(this.r, this.g, this.b));
		for (let i = 0; i < nbr && type == "avion"; i++)
			this.unit.avion.push(create_avion(this.r, this.g, this.b));	
		for (let i = 0; i < nbr && type == "soldat"; i++)
			this.unit.soldat.push(create_soldat(this.r, this.g, this.b));
	}
}

function create_char(r, g, b)
{
	var char = new Object();
	char.pv = 3;
	char.dmg = 1;
	char.speed = 1;
	char.color = [r, g, b];
	char.x = 0;
	char.y = 0;
	char.z = 0;
	char.sizex = 0.2;
	char.sizey = 0.2;
	char.sizez = 0.2;
	char.hit = 0;
	return (char);
}

function create_soldat(r, g, b)
{
	var soldat = new Object();
	soldat.pv = 1;
	soldat.dmg = 3;
	soldat.speed = 1;
	soldat.color = [r, g, b];
	soldat.x = 0;
	soldat.y = 0;
	soldat.z = 0;
	soldat.sizex = 0.1;
	soldat.sizey = 0.3;
	soldat.sizez = 0.2;
	soldat.hit = 0;
	return (soldat);
}

function create_avion(r, g, b)
{
	var avion = new Object();
	avion.pv = 1;
	avion.dmg = 1;
	avion.speed = 3;
	avion.color = [r, g, b];
	avion.x = 0;
	avion.y = 0;
	avion.z = 1;
	avion.sizex = 0.3;
	avion.sizey = 0.1;
	avion.sizez = 0.01;
	avion.hit = 0;
	return (avion);
}
