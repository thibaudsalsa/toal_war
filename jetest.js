/*global attack attack_city move_unit launch_right launch_left*/
function init_game()
{
	var game = new Object();
	//les trois equipe
	var rgb = [0, 0, 200];
	var pos_unit = [0.6, 0.6, 0];
	game.team1 = create_team(rgb, pos_unit, 1);
	rgb = [253, 106, 2];
	pos_unit = [0.6, 6, 0];
	game.team2 = create_team(rgb, pos_unit, 2);
	rgb = [200, 0, 0];
	pos_unit = [6, 0.6, 0];
	game.team3 = create_team(rgb, pos_unit, 3);
	game.attack = attack;
	game.attack_city = attack_city;
	game.move = move_unit;
	game.card = init_card();
	game.info = "";
	return (game);
}

function create_team(rgb, pos_unit, numero_team)
{
	var team = new Object();
	team.name = "";
	team.id = numero_team;
	team.player = "";
	team.color = "";
	team.money = 50;
	team.city = 6000;
	team.carte = [];
	team.r = rgb[0];
	team.g = rgb[1];
	team.b = rgb[2];
	team.pos_unit = pos_unit;
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
	if (this.unit.soldat.length + this.unit.char.length + this.unit.avion.length < 100 && this.money >= 5)
	{
		this.money -= 5;
		for (let i = 0; i < nbr && type == "char"; i++)
			this.unit.char.push(create_char(this.r, this.g, this.b, this.pos_unit));
		for (let i = 0; i < nbr && type == "avion"; i++)
			this.unit.avion.push(create_avion(this.r, this.g, this.b, this.pos_unit));	
		for (let i = 0; i < nbr && type == "soldat"; i++)
			this.unit.soldat.push(create_soldat(this.r, this.g, this.b, this.pos_unit));
	}
}

function create_char(r, g, b, pos_unit)
{
	var char = new Object();
	char.pv = 3;
	char.dmg = 1;
	char.speed = 1;
	char.color = [r, g, b];
	char.x = pos_unit[0];
	char.y = pos_unit[1];
	char.z = pos_unit[2];
	char.sizex = 0.2;
	char.sizey = 0.2;
	char.sizez = 0.2;
	char.hit = 0;
	return (char);
}

function create_soldat(r, g, b, pos_unit)
{
	var soldat = new Object();
	soldat.pv = 1;
	soldat.dmg = 3;
	soldat.speed = 1;
	soldat.color = [r, g, b];
	soldat.x = pos_unit[0];
	soldat.y = pos_unit[1];
	soldat.z = pos_unit[2];
	soldat.sizex = 0.1;
	soldat.sizey = 0.1;
	soldat.sizez = 0.4;
	soldat.hit = 0;
	return (soldat);
}

function create_avion(r, g, b, pos_unit)
{
	var avion = new Object();
	avion.pv = 1;
	avion.dmg = 1;
	avion.speed = 3;
	avion.color = [r, g, b];
	avion.x = pos_unit[0];
	avion.y = pos_unit[1];
	avion.z = pos_unit[2] + 1;
	avion.sizex = 0.3;
	avion.sizey = 0.1;
	avion.sizez = 0.01;
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

var x = "team";
var y = 2;
function init_card()
{
	var Icard = new Object();
	Icard.tab_nation = create_tab_nation();
	Icard.tab_bonus = create_tab_bonus();
	Icard.tab_proba_carte = calcule_proba(Icard);
	Icard.add_fct = add_fct;
	Icard.add_fct();
	Icard.get_card = return_card;
	return (Icard);
}
/* Creer chacune des cartes et lui associe sa function membre*/
function create_tab_nation(nb_card)
{
	var tab_card = [nb_card];
	var id = ["Dubai"];/* -----------------------------------*/
	var img = ["pas d'image", "", "", ""];
	var text = ["à utiliser une carte nation", "", "", ""];
	var prob = [1, 0, 0, 0]; 
	for (let i = 0; i < id.length; i++)
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
	var id = ["plagiat","soin", "Prêt a la banque"];/* -----------------------------------*/
	var img = ["pas d'image", "", "", ""];
	var text = ["à utiliser une carte bonus.", 
				"à utiliser une carte bonus.", 
				"à utiliser une carte bonus.",];
	var prob = [4, 4, 6, 0];
	for (let i = 0; i < id.length; i++)
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
	var tab_fct_nation = [dubai];/* -----------------------------------*/
	for (let i = 0; i < tab_fct_nation.length; i++)
	{
		this.tab_nation[i].use = tab_fct_nation[i];
	}
	var tab_fct_bonus = [plagiat, soin, pret_a_la_banque];/* -----------------------------------*/
	for (let i = 0; i < tab_fct_bonus.length; i++)
	{
		this.tab_bonus[i].use = tab_fct_bonus[i];
	}
}
/* Fin */

/* Function pour thibaud*/
function use_card(num_card)/* dans l'objet team */
{
	if (this.carte.length - 1 < num_card || num_card < 0)
		return ;
	game.info += "Team : " + this.id + " " + this.carte[num_card].text + "\n"  ;
	this.carte[num_card].use(num_card, this);
	var tab_divise = [];
	for (let i = 0; i < this.carte.length; i++)
	{
		if (i != num_card)
			tab_divise.push(this.carte[i]);
	}
	this.carte = tab_divise;
}
function return_card(num_card,team)/* dans l'objet Icard */
{
	if (num_card >= 0 && num_card < game.card.tab_nation.length)
		team.carte.push(this.tab_nation[num_card]);
	if (num_card == -1)
		team.carte.push(this.tab_proba_carte[(Math.floor(Math.random() * (this.tab_proba_carte.length + 0)))]);
	else 
		return ;
}
/* fin */
/* creation du tableau avec les cartes et leurs probabilités */
function calcule_proba(Icard)
{
	var tab_proba_carte = [];
	for ( let i = 0; i < Icard.tab_bonus.length; i++)
	{
		for (let j = 0; j < Icard.tab_bonus[i].prob; j++)
			tab_proba_carte.push(Icard.tab_bonus[i])
	}
	return (tab_proba_carte);
}
/* fin */

/* functions des cartes bonus */
function plagiat(num_card,team)
{
	var tab_team = [game.team1,game.team2,game.team3];
	var num = team.id;

	num += 1 ;
	if (num == 4)
		num = 1;
	var aleatoire = Math.floor(Math.random() * (2 + 0));
	if (aleatoire == 1)
	{
		team.carte.push(tab_team[num-1].carte[tab_team[num-1].carte.length - 1]);
	}
	else 
	{	
		num += 1;
		if (num == 4)
			num = 1;
		team.carte.push(tab_team[num-1].carte[tab_team[num-1].carte.length - 1]);
	}
}

function soin(num_card, team)
{
	team.city += 1000;
}

function pret_a_la_banque(num_card, team)
{
	team.money += (Math.floor(Math.random() * (30 + 0))+30);
}
/* function des cartes nation */ 
function dubai(num_card,team)
{
	var tab_team = [game.team1,game.team2,game.team3];
	var gold = team.money;
	var num = team.id;
	num += 1 ;
	if (num == 4)
		num = 1;
	var aleatoire = Math.floor(Math.random() * (2 + 0));
	if (aleatoire == 1)
	{
		team.money = tab_team[num-1].money;
		tab_team[num-1].money = gold
	}
	else 
	{	
		num += 1;
		if (num == 4)
			num = 1;
		team.money = tab_team[num-1].money;
		tab_team[num-1].money = gold
	}
}
	





/* fin */
var game=init_game();
game.card.get_card(0, game.team1);
game.card.get_card(0, game.team2);
game.card.get_card(0, game.team3);
game.card.get_card(-1, game.team1);
game.card.get_card(-1, game.team1);
game.team2.money = 80;
game.team3.money = 120;
game.team1.use_card(0)
console.log(game.team1.money,game.team2.money ,game.team3.money)
console.log(game.info)



