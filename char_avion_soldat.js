function init_game()
{
	var game = new Object();
	game.team1 = create_team();
	game.team2 = create_team();
	game.team3 = create_team();
	return (game);
}

function create_team()
{
	var team = new Object();
	team.player = "";
	team.color = "";
	team.money = 200;
	team.city = 200;
	team.unit = create_team_unit();
	return (team);
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

function create_team_unit()
{
	var team_unit = new Object();
	team_unit.char = [];
	team_unit.soldat = [];
	team_unit.avion = [];
	team_unit.char_in = [];
	team_unit.soldat_in = [];
	team_unit.avion_in = [];
	team_unit.del = destroy_soldier;
	team_unit.launch = lunch_unit;
	return (team_unit);
}

function add_unit(team, type)
{
	if (team == 1)
		this.team1.unit = type_unit(this.team1.unit, type);
	if (team == 2)
	    this.team2.unit = type_unit(this.team2.unit, type);
	if (team == 3)
		this.team3.unit = type_unit(this.team3.unit, type);
}

function type_unit(team_unit, type)
{
	if (type == "char")
		team_unit.char.push(create_char());
	if (type == "avion")
		team_unit.avion.push(create_avion());	
	if (type == "soldat")
		team_unit.soldat.push(create_soldat());
	return (team_unit);
}

function destroy_soldier()
{
	var char = [];
	var soldier = [];
	var plane = [];
	
	for (let i = 0; i < this.char_in.length; i++)
	{
		if (this.char_in[i].pv > 0)
			char.push(this.char_in[i]);
	}
	for (let i = 0; i < this.soldat_in.length; i++)
	{
		if (this.soldat_in[i].pv > 0)
			soldier.push(this.soldat_in[i]);
	}
	for (let i = 0; i < this.avion_in.length; i++)
	{
		if (this.avion_in[i].pv > 0)
			plane.push(this.avion_in[i]);
	}
	this.char_in = char;
	this.soldat_in = soldier;
	this.avion_in = plane;
}

function del_unit()
{
	this.team1.unit.del();
	this.team2.unit.del();
	this.team3.unit.del();
}

function lunch_unit(type)
{
	if (type == "char")
	{
		this.char_in.push(this.char[0]);
		this.char.pop();
	}
	if (type == "avion")
	{
		this.avion_in.push(this.avion[0]);
		this.avion.pop();
	}
	if (type == "soldat")
	{
		this.soldat_in.push(this.soldat[0]);
		this.soldat.pop();
	}
}

function add_unit_in(team, type)
{
	if (team == 1)
		this.team1.unit.launch(type);
	if (team == 2)
		this.team2.unit.launch(type);
	if (team == 3)
		this.team3.unit.launch(type);
}