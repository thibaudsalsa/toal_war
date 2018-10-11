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
function do_dmg(unit, target)
{
	if (unit.x == target.x && unit.y == target.y)
	{
		target.pv -= unit.dmg;
		unit.hit = 1;
	}
	else
		return (null);
	return (target);
}

function die(tab)
{
	var tmp = [];
	
	for (let i = 0; i < tab.length; i++)
	{
		if (tab[i].pv > 0)
			tmp.push(tab[i]);
	}
	return (tmp);
}

function unit_attack(my_unit, ennemies)
{
    var tmp;
    var i = 0;
    //attack les chars
	for (i; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.char.length; j++)
		{
			tmp = do_dmg(my_unit[i], ennemies.char[j]);
			if (tmp != null)
			{
				ennemies.char[j] = tmp;
				break;
			}
		}
	}
	//attaquent les soldats
	for (i; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.soldat.length; j++)
		{
			tmp = do_dmg(my_unit[i], ennemies.soldat[j]);
			if (tmp != null)
			{
				ennemies.soldat[j] = tmp;
				break;
			}
		}
	}
	//attaquent les avions
	for (i; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.avion.length; j++)
		{
			tmp = do_dmg(my_unit[i], ennemies.avion[j]);
			if (tmp != null)
			{
				ennemies.avion[j] = tmp;
				break;
			}
		}
	}
	ennemies.char = die(ennemies.char);
	ennemies.soldat = die(ennemies.soldat);
	ennemies.avion = die(ennemies.avion);
	return (ennemies);
}

function fight(my_units, ennemies)
{
	//les avions attaquent
	ennemies = unit_attack(my_units.avion, ennemies);
	my_units = unit_attack(ennemies.avion, my_units);
	//les soldats attaquent
	ennemies = unit_attack(my_units.soldat, ennemies);
	my_units = unit_attack(ennemies.soldat, my_units);
	//les chars attaquent
	ennemies = unit_attack(my_units.char, ennemies);
	my_units = unit_attack(ennemies.char, my_units);
	var tab = [my_units, ennemies];
	return (tab);
}

function attack()
{
	var tab;
	tab = fight(this.team1.unit.unit_left, this.team2.unit.unit_right);
	this.team1.unit.unit_left = tab[0];
	this.team2.unit.unit_right = tab[1];
	tab = fight(this.team2.unit.unit_left, this.team3.unit.unit_right);
	this.team2.unit.unit_left = tab[0];
	this.team3.unit.unit_right = tab[1];
	tab = fight(this.team3.unit.unit_left, this.team1.unit.unit_right);
	this.team3.unit.unit_left = tab[0];
	this.team1.unit.unit_right = tab[1];
}

function dmg_city(unit, city_pv, posx, posy)
{
    for (let i = 0; i < unit.avion.length; i++)
    {
        if (unit.avion[i].x === posx && unit.avion[i].y === posy && unit.avion[i].hit == 0)
        {
            city_pv -= unit.avion[i].dmg;
            unit.avion[i].hit = 1;
        }
    }
    for (let i = 0; i < unit.soldat.length; i++)
    {
        if (unit.soldat[i].x === posx && unit.soldat[i].y === posy && unit.soldat[i].hit == 0)
        {
            city_pv -= unit.soldat[i].dmg;
            unit.soldat[i].hit = 1;
        }
    }
    for (let i = 0; i < unit.char.length; i++)
    {
        if (unit.char[i].x === posx && unit.char[i].y === posy && unit.char[i].hit == 0)
        {
            city_pv -= unit.char[i].dmg;
            unit.char[i].hit = 1;
        }
    }
    return (city_pv);
}

function attack_city()
{
    var unit;
    //les unités de la team 1 attaquent les villes
    unit = this.team1.unit.unit_left;
    this.team2.city = dmg_city(unit, this.team2.city, 1, 1);
    unit = this.team1.unit.unit_right;
    this.team3.city = dmg_city(unit, this.team3.city, 1, 1);
    //les unités de la team 2 attaquent les villes
    unit = this.team2.unit.unit_left;
    this.team3.city = dmg_city(unit, this.team3.city, 1, 1);
    unit = this.team2.unit.unit_right;
    this.team1.city = dmg_city(unit, this.team1.city, 1, 1);
    //les unités de la team 3 attaquent les villes
    unit = this.team3.unit.unit_left;
    this.team1.city = dmg_city(unit, this.team1.city, 1, 1);
    unit = this.team3.unit.unit_right;
    this.team2.city = dmg_city(unit, this.team2.city, 1, 1);
}

function move(unit, x_operator, y_operator)
{
	switch(x_operator)
	{
		case '+':
			unit.x += unit.speed
		case '-':
			unit.x -= unit.speed
	}
	switch(y_operator)
	{
		case '+':
			unit.y += unit.speed
		case '-':
			unit.y -= unit.speed
	}
}

function back_hit(unit)
{
	for (let i = 0; i < unit.avion.length; i++)
		unit.avion[i].hit = 0;
	for (let i = 0; i < unit.soldat.length; i++)
		unit.soldat[i].hit = 0;
	for (let i = 0; i < unit.char.length; i++)
		unit.char[i].hit = 0;
}

function move_type(unit, x_operator, y_operator)
{
	for (let i = 0; i < unit.avion.length; i++)
	{
		if (unit.avion[i].hit == 0)
			move(unit.avion[i], x_operator, y_operator);
	}
	for (let i = 0; i < unit.soldat.length; i++)
	{
		if (unit.soldat[i].hit == 0)
			move(unit.soldat[i], x_operator, y_operator);
	}
	for (let i = 0; i < unit.char.length; i++)
	{
		if (unit.char[i].hit == 0)
			move(unit.char[i], x_operator, y_operator);
	}
	back_hit(unit);
}

function move_unit()
{
	//move unit team1
	move_type(this.team1.unit.unit_left, '+', 'o');
	move_type(this.team1.unit.unit_right, 'o', '-');
	//move unit team2
	move_type(this.team2.unit.unit_left, '-', '+');
	move_type(this.team2.unit.unit_right, '-', 'o');
	//move unit team3
	move_type(this.team3.unit.unit_left, 'o', '-');
	move_type(this.team3.unit.unit_right, '+', '-');
}

function launch_left(type, nb)
{
	if (type == "char" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.char.push(this.unit.char[0]);
			this.unit.char.pop();
		}
	}
	else if (type == "avion" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.avion.push(this.unit.avion[0]);
			this.unit.avion.pop();
		}
	}
	else if (type == "soldat" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.soldat.push(this.unit.soldat[0]);
			this.unit.soldat.pop();
		}
	}
}

function launch_right(type, nb)
{
	if (type == "char" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.char.push(this.unit.char[0]);
			this.unit.char.pop();
		}
	}
	else if (type == "avion" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.avion.push(this.unit.avion[0]);
			this.unit.avion.pop();
		}
	}
	else if (type == "soldat" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.soldat.push(this.unit.soldat[0]);
			this.unit.soldat.pop();
		}
	}
}
var x = init_card();
/*console.log(x.)*/
function init_card()
{
	var Icard = new Object();
	Icard.tab_nation = create_tab_nation(4);
	Icard.tab_bonus = create_tab_bonus(4);
	Icard.add_fct = add_fct;
	Icard.get_card = return_card;
	Icard.add_fct();
	return (Icard);
}
/* Creer chacune des cartes et lui associe sa function membre*/
function create_tab_nation(nb_card)
{
	var tab_card = [nb_card];
	var id = ["vatican", "liban", "dubai", "kosovo"];
	var img = ["image1", "image2", "image3", "image4"];
	var text = ["JE SAIS PAS", "JE SAIS PAS", "JE SAIS PAS", "JE SAIS PAS"];
	var prob = [1, 1, 1, 1];
	for (let i = 0; i < nb_card; i++)
	{
		var card = new Object();
		card.id = id[i];
		card.img = img[i];
		card.text = text[i];
		card.prob = prob[i];
		tab_card[i] = card;
	}
	return (tab_card);
}

function create_tab_bonus(nb_card)
{
	var tab_card = [nb_card];
	var id = ["seismes", "Allié inatendu 1", "Prêt à la banque 1", "Appuie aérien"];
	var img = ["image1", "image2", "image3", "image4"];
	var text = ["JE SAIS PAS", "JE SAIS PAS", "JE SAIS PAS", "JE SAIS PAS"];
	var prob = [1, 1, 1, 1];
	for (let i = 0; i < nb_card; i++)
	{
		var card = new Object();
		card.id = id[i];
		card.img = img[i];
		card.text = text[i];
		card.prob = prob[i];	
		tab_card[i] = card;
	}
	return (tab_card);
}

function add_fct()
{
	var tab_fct_nation = ["", "", "", ""];
	for (let i=0; i < tab_fct_nation.length; i++)
	{
		this.tab_nation[i].use = tab_fct_nation[i];
	}
	var tab_fct_bonus = ["", "", "", ""];
	for (let i=0; i < tab_fct_bonus.length; i++)
	{
		this.tab_bonus[i].use = tab_fct_bonus[i];
	}
}
/* Fin */

/* Function pour thibaud*/
function use_card(num_card)
{
	this.carte[num_card].use();
}
function return_card(num_card)
{
	if (num_card != -1)
		return (this.tab_nation[num_card]);
	else
		return (this.tab_nation[(Math.floor( Math.random() * (this.tab_nation.length + 0)))]);
}
/* fin */

/* functions membres des cartes*/
function pret_a_la_banque(numero)
{
	this.money += numero * 5;
}
function allie_inattendu(numero)
{
	var nb_unit = this.unit.char.length + this.unit.avion.length + this.unit.soldat.length;
	if (nb_unit + 3 * numero < 150);
	{
		this.add("char",numero*2);
		this.add("avion",numero*2);
		this.add("soldat",numero*2);
	}
}
function espion1(team, see_unit)
{
	if (see_unit == "char")
		return (team.unit.char.length);
	if (see_unit == "avion")
		return (team.unit.avion.length);
	if (see_unit == "soldat")
		return (team.unit.soldat.length);
}
function espion2(team)
{
	return (team.unit.char.length + team.unit.avion.length + team.unit.soldat.length);
}
function effort_diplomatique(team2, team3)
{
	this.money += 30;
	calcule_retrait_argent(team2);
	calcule_retrait_argent(team3);
}
function calcule_retrait_argent(team, montant)
{
	if (team.money > montant)
		team.money -= montant;
	else
		team.money = 0;
}
/* fin */
var x=init_game();
var carte = x.card.get_card(-1);
x.team1.carte.push(carte)
console.log(x.team1.carte)
