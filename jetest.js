/*global attack attack_city move_unit launch_right launch_left init_card use_card return_card*/
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
	game.info = "";
	game.carte = init_card();
	return (game);
}

function create_team(rgb, pos_unit, numero_team)
{
	var team = new Object();
	team.name = "";
	team.id = numero_team;
	team.player = "";
	team.color = "";
	team.money = 15;
	team.city = 600;
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
	team.get_card = return_card;
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
	char.speed = 1 / 3;
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
	soldat.speed = 1 / 3;
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
	avion.speed = 3 / 3;
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
	if ((unit.x >= target.x - 0.1 && unit.x <= target.x + 0.1)
	&& (unit.y >= target.y - 0.1 && unit.y <= target.y + 0.1)
	&& unit.hit === 0
	&& target.pv > 0)
	{
		target.pv -= unit.dmg;
		unit.hit = 1;
	}
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

function unit_attack(my_unit, ennemies, type)
{
    //attaquent les chars
	for (let i = 0; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.char.length; j++)
		{
			do_dmg(my_unit[i], ennemies.char[j]);
			if (my_unit[i].hit === 1)
			{
				if (type === "char")
					do_dmg(ennemies.char[j], my_unit[i]);
				break;
			}
		}
	}
	//attaquent les soldats
	for (let i = 0; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.soldat.length; j++)
		{
			do_dmg(my_unit[i], ennemies.soldat[j]);
			if (my_unit[i].hit === 1)
			{
				if (type === "soldat")
					do_dmg(ennemies.soldat[j], my_unit[i]);
				break;
			}
		}
	}
	//attaquent les avions
	for (let i = 0; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.avion.length; j++)
		{
			do_dmg(my_unit[i], ennemies.avion[j]);
			if (my_unit[i].hit === 1)
			{
				if (type === "avion")
					do_dmg(ennemies.avion[j], my_unit[i]);
				break;
			}
		}
	}
	ennemies.char = die(ennemies.char);
	ennemies.soldat = die(ennemies.soldat);
	ennemies.avion = die(ennemies.avion);
}

function fight(my_units, ennemies)
{
	//les avions attaquent
	unit_attack(my_units.avion, ennemies, "avion");
	unit_attack(ennemies.avion, my_units);
	//les soldats attaquent
	unit_attack(my_units.soldat, ennemies, "soldat");
	unit_attack(ennemies.soldat, my_units);
	//les chars attaquent
	unit_attack(my_units.char, ennemies, "char");
	unit_attack(ennemies.char, my_units);
}

function attack()
{
	fight(this.team1.unit.unit_left, this.team2.unit.unit_right);
	fight(this.team2.unit.unit_left, this.team3.unit.unit_right);
	fight(this.team3.unit.unit_left, this.team1.unit.unit_right);
}

function dmg_city(unit, city_pv, posx, posy)
{
    for (let i = 0; i < unit.avion.length; i++)
    {
        if ((unit.avion[i].x >= posx - 0.1 && unit.avion[i].x <= posx + 0.1)
        && (unit.avion[i].y >= posy - 0.1 && unit.avion[i].y <= posy + 0.1)
        && unit.avion[i].hit == 0)
        {
        	if (city_pv < 0)
        		unit.avion[i].pv = 0;
            city_pv -= unit.avion[i].dmg / 100;
            unit.avion[i].hit = 1;
        }
    }
    for (let i = 0; i < unit.soldat.length; i++)
    {
        if ((unit.soldat[i].x >= posx - 0.1 && unit.soldat[i].x <= posx + 0.1)
        && (unit.soldat[i].y >= posy - 0.1 && unit.soldat[i].y <= posy + 0.1)
        && unit.soldat[i].hit == 0)
        {
        	if (city_pv < 0)
        		unit.soldat[i].pv = 0;
            city_pv -= unit.soldat[i].dmg / 100;
            unit.soldat[i].hit = 1;
        }
    }
    for (let i = 0; i < unit.char.length; i++)
    {
        if ((unit.char[i].x >= posx - 0.1 && unit.char[i].x <= posx + 0.1)
        && (unit.char[i].y >= posy - 0.1 && unit.char[i].y <= posy + 0.1)
        && unit.char[i].hit == 0)
        {
        	if (city_pv < 0)
        		unit.char[i].pv = 0;
            city_pv -= unit.char[i].dmg / 100;
            unit.char[i].hit = 1;
        }
    }
    unit.char = die(unit.char);
	unit.soldat = die(unit.soldat);
	unit.avion = die(unit.avion);
    return (city_pv);
}

function attack_city()
{
    var unit;
    //les unités de la team 1 attaquent les villes
    unit = this.team1.unit.unit_left;
    this.team2.city = dmg_city(unit, this.team2.city, this.team2.pos_unit[0], this.team2.pos_unit[1]);
    unit = this.team1.unit.unit_right;
    this.team3.city = dmg_city(unit, this.team3.city, this.team3.pos_unit[0], this.team3.pos_unit[1]);
    //les unités de la team 2 attaquent les villes
    unit = this.team2.unit.unit_left;
    this.team3.city = dmg_city(unit, this.team3.city, this.team3.pos_unit[0], this.team3.pos_unit[1]);
    unit = this.team2.unit.unit_right;
    this.team1.city = dmg_city(unit, this.team1.city, this.team1.pos_unit[0], this.team1.pos_unit[1]);
    //les unités de la team 3 attaquent les villes
    unit = this.team3.unit.unit_left;
    this.team1.city = dmg_city(unit, this.team1.city, this.team1.pos_unit[0], this.team1.pos_unit[1]);
    unit = this.team3.unit.unit_right;
    this.team2.city = dmg_city(unit, this.team2.city, this.team2.pos_unit[0], this.team2.pos_unit[1]);
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

function move(unit, x_operator, y_operator)
{
	if (x_operator === '+')
		unit.x += unit.speed / 100;
	else if (x_operator === '-')
		unit.x -= unit.speed / 100;
	if (y_operator === '+')
		unit.y += unit.speed / 100;
	else if (y_operator === '-')
		unit.y -= unit.speed / 100;
}

function move_unit()
{
	//move unit team1
	move_type(this.team1.unit.unit_left, 'o', '+');
	move_type(this.team1.unit.unit_right, '+', 'o');
	//move unit team2
	move_type(this.team2.unit.unit_left, '+', '-');
	move_type(this.team2.unit.unit_right, 'o', '-');
	//move unit team3
	move_type(this.team3.unit.unit_left, '-', 'o');
	move_type(this.team3.unit.unit_right, '-', '+');
}

function launch_left(type, nb)
{
	if (nb > 100)
		nb = 100;
	if (type === "char" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.char.push(this.unit.char[this.unit.char.length - 1]);
			this.unit.char.pop();
		}
	}
	else if (type === "avion" && this.unit.avion.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.avion.push(this.unit.avion[this.unit.avion.length - 1]);
			this.unit.avion.pop();
		}
	}
	else if (type === "soldat" && this.unit.soldat.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.soldat.push(this.unit.soldat[this.unit.soldat.length - 1]);
			this.unit.soldat.pop();
		}
	}
}

function launch_right(type, nb)
{
	if (nb > 100)
		nb = 100;
	if (type === "char" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.char.push(this.unit.char[this.unit.char.length - 1]);
			this.unit.char.pop();
		}
	}
	else if (type === "avion" && this.unit.avion.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.avion.push(this.unit.avion[this.unit.avion.length - 1]);
			this.unit.avion.pop();
		}
	}
	else if (type === "soldat" && this.unit.soldat.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.soldat.push(this.unit.soldat[this.unit.soldat.length - 1]);
			this.unit.soldat.pop();
		}
	}
}
/*global game:true*/

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
/* Creation de l'objet Icard */
function create_tab_nation(nb_card)
{
	var tab_card = [nb_card];
	var id = ["Dubai","France"];/* -----------------------------------*/
	var img = ["pas d'image", "pas d'image", "", ""];
	var text = ["à utiliser une carte nation",
				"à utiliser une carte nation"];
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
	var id = ["plagiat","soin", "Prêt a la banque", 
				"appuie aérien","incendie","bluff", 
				"séismes", "allié inattendu", "forcer le jeu", 
				"d'une pierre de carte", "retentez votre chance", "espion2"];
	var img = ["", "", "", "", "", "", "", "", "", "", "", ""];
	var text = ["a utilisé une carte bonus.", 
				"a utilisé une carte bonus.", 
				"a utilisé une carte bonus.",
				"a utilisé un Appuie aérien.",
				"a declanché un incendie.",
				"a utilisé une carte bonus.",
				"a fait tremblé le sol.",
				"a utilisé une carte bonus.",
				"vous a forcé a utiliser une carte.",
				"a utilisé une carte bonus.",
				"a utilisé une carte bonus.",
				"a une information a vous donner."];
	var prob = [4, 4, 6, 1, 4, 5, 1 , 6, 4, 2, 2];
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
	var tab_fct_nation = [dubai, france];/* -----------------------------------*/
	for (let i = 0; i < tab_fct_nation.length; i++)
	{
		this.tab_nation[i].use = tab_fct_nation[i];
	}
	var tab_fct_bonus = [plagiat, soin, pret_a_la_banque,
						appuie_aerien, incendie, bluff,
						seisme, allie_inattendu, forcer_le_jeu, 
						d_une_pierre_de_carte, retentez_votre_chance,espion2];/* -----------------------------------*/
	for (let i = 0; i < tab_fct_bonus.length; i++)
	{
		this.tab_bonus[i].use = tab_fct_bonus[i];
	}
}

function calcule_proba(Icard)
{
	var tab_proba_carte = [];
	for ( let i = 0; i < Icard.tab_bonus.length; i++)
	{
		for (let j = 0; j < Icard.tab_bonus[i].prob; j++)
			tab_proba_carte.push(Icard.tab_bonus[i]);
	}
	return (tab_proba_carte);
}
/* Fin */

/* Function pour thibaud*/
function use_card(num_card)/* dans l'objet team */
{
	var color = ["bleu", "orange" , "rouge"];
	if (this.carte.length - 1 < num_card || num_card < 0)
		return ;
	game.info += "La team " + color[this.id - 1] + " " + this.carte[num_card].text + "\n"  ;
	this.carte[num_card].use(this);
	var tab_divise = [];
	for (let i = 0; i < this.carte.length; i++)
	{
		if (i != num_card)
			tab_divise.push(this.carte[i]);
	}
	this.carte = tab_divise;
}
function return_card(num_card)/* dans l'objet Icard */
{
	var price = 20;
	if (this.carte.length > 5 || this.money < price)
		return;
	this.money -= price;
	if (num_card >= 0 && num_card < game.carte.tab_nation.length)
		this.carte.push(game.carte.tab_nation[num_card]);
	if (num_card == -1)
		this.carte.push(game.carte.tab_proba_carte[(Math.floor(Math.random() * (game.carte.tab_proba_carte.length + 0)))]);
}
/* fin */

/* functions des cartes bonus */
function plagiat(team)
{
	var tab_team = [game.team1, game.team2, game.team3];
	var num = team.id;

	num += 1;
	if (num == 4)
		num = 1;
	var aleatoire = Math.floor(Math.random() * (2));
	if (aleatoire == 1)
	{
		if (tab_team[num - 1].carte.length != 0)
			team.carte.push(tab_team[num - 1].carte[tab_team[num - 1].carte.length - 1]);
	}
	else 
	{
		num += 1;
		if (num == 4)
			num = 1;
		if (tab_team[num - 1].carte.length != 0)
			team.carte.push(tab_team[num - 1].carte[tab_team[num - 1].carte.length - 1]);
	}
}

function soin(team)
{
	if (team.city < 500)
		team.city += 100;
	else
		team.city = 600;
}

function pret_a_la_banque(team)
{
	team.money += (Math.floor(Math.random() * (30 + 0))+30);
}

function appuie_aerien(team)
{
	var tab_team = [game.team1, game.team2, game.team3];
	var num = team.id;

	num += 1;
	if (num == 4)
		num = 1;
	var aleatoire = Math.floor(Math.random() * (2));
	if (aleatoire == 1)
		tab_team[num-1].city -= 60;
	else 
	{
		num += 1;
		if (num == 4)
			num = 1;
		tab_team[num-1].city -= 60;
	}
}

function incendie(team)
{
	var aleatoire = Math.floor(Math.random() * (3));
	var moins_char = Math.floor(Math.random() * (11));
	var moins_avion = Math.floor(Math.random() * (11));
	var moins_soldat = Math.floor(Math.random() * (11));
	switch (aleatoire)
	{
		case (0):
			game.team1.unit.char -= moins_char;
			game.team1.unit.avion -= moins_avion;
			game.team1.unit.soldat -= moins_soldat;
			no_negativ_unit(game.team1);
			break
		case (1):
			game.team2.unit.char -= moins_char;
			game.team2.unit.avion -= moins_avion;
			game.team2.unit.soldat -= moins_soldat;
			no_negativ_unit(game.team2);
			break
		case (2):
			game.team3.unit.char -= moins_char;
			game.team3.unit.avion -= moins_avion;
			game.team3.unit.soldat -= moins_soldat;
			no_negativ_unit(game.team3);
			break
	}
}

function bluff(team)
{	
}

function seisme(team)
{
	var aleatoire = Math.floor(Math.random() * (3));
	switch (aleatoire)
	{
		case (0):
			delete_unit(game.team1.unit.unit_left, game.team2.unit.unit_right)
			break;
		case (1):
			delete_unit(game.team2.unit.unit_left, game.team3.unit.unit_right)
			break;
		case (2):
			delete_unit(game.team3.unit.unit_left, game.team1.unit.unit_right)
			break;
	}
}	

function allie_inattendu(team)
{
	team.add("char",Math.floor(Math.random() * (6)));
	team.add("avion",Math.floor(Math.random() * (6)));
	team.add("soldat",Math.floor(Math.random() * (6)));
}

function forcer_le_jeu(team)
{
	var tab = return_enemie_team(team);
	var aleatoire = Math.floor(Math.random() * (2));
	if (aleatoire == 0 && tab[0].carte.length > 0)
		tab[0].use_card(Math.floor(Math.random() * (tab[0].carte.length)));
	else if (aleatoire == 1 && tab[1].carte.length > 0)
		tab[1].use_card(Math.floor(Math.random() * (tab[1].carte.length)));
}

function d_une_pierre_de_carte(team)
{
	if (team.carte.length <= 4 )
	{	
		team.money += 40;
		team.get_card(-1);
		team.get_card(-1);
	}
	if (team.carte.length == 5)
	{
		team.money += 20;
		team.get_card(-1);
	}
}

function retentez_votre_chance(team)
{
	team.money += 20;
}

function espion2(team)
{
	var tab = return_enemie_team(team);
	var color = ["bleu", "orange" , "rouge"];
	var aleatoire = Math.floor(Math.random() * (2));
	if (aleatoire == 0)
		game.info += "La team " + color[tab[0].id - 1] + " posséde : " + 
						tab[0].unit.char.length + " char, " + 
						tab[0].unit.avion.length + " avion, " +
						tab[0].unit.soldat.length + " soldat."
	else
		game.info += "La team " + color[tab[1].id - 1] + " posséde : " + 
						tab[1].unit.char.length + " char, " + 
						tab[1].unit.avion.length + " avion, " +
						tab[1].unit.soldat.length + " soldat."
}
/* fin */ 
/* function utilisé pour les cartes bonus */
function no_negativ_unit(team)
{
	if (team.unit.char < 0)
		team.unit.char = 0;
	if (team.unit.avion < 0)
		team.unit.avion = 0;
	if (team.unit.soldat < 0)
		team.unit.soldat = 0;
}

function delete_unit(unit1, unit2)
{
	unit1.char = [];
	unit1.avion = [];
	unit1.soldat = [];
	unit2.char = []
	unit2.avion = [];
	unit2.soldat = [];
}
function return_enemie_team(team)
{
	var tab_team = [game.team1, game.team2, game.team3];
	var tab = [];
	for (let i = 0; i < 3; i++)
	{
		if (tab_team[i].id != team.id)
			tab.push(tab_team[i]);
	} 
	return (tab);
}

function impots_eleve(team)
{
	
}
/* fin */ 

/* function des cartes nation */ 
function dubai(team)
{
	var tab_team = [game.team1,game.team2,game.team3];
	var gold = team.money;
	var num = team.id;
	num += 1;
	if (num == 4)
		num = 1;
	var aleatoire = Math.floor(Math.random() * (2 + 0));
	if (aleatoire == 1)
	{
		team.money = tab_team[num-1].money;
		tab_team[num-1].money = gold;
	}
	else 
	{	
		num += 1;
		if (num == 4)
			num = 1;
		team.money = tab_team[num-1].money;
		tab_team[num-1].money = gold;
	}
}

function france(team)
{
	for (let i = 0; i < team.unit.unit_left.char.length; i++)
		team.unit.unit_left.char[i].speed = 0;
	for (let i = 0; i < team.unit.unit_left.soldat.length; i++)
		team.unit.unit_left.soldat[i].speed = 0;
	for (let i = 0; i < team.unit.unit_left.avion.length; i++)
		team.unit.unit_left.avion[i].speed = 0;
	for (let i = 0; i < team.unit.unit_right.char.length; i++)
		team.unit.unit_right.char[i].speed = 0;
	for (let i = 0; i < team.unit.unit_right.soldat.length; i++)
		team.unit.unit_right.soldat[i].speed = 0;
	for (let i = 0; i < team.unit.unit_right.avion.length; i++)
		team.unit.unit_right.avion[i].speed = 0;	
}
/* fin */ 
/*game = init_game();
game.team3.carte.push(game.carte.tab_bonus[11])
game.team2.add("char", 20)
game.team3.use_card(0)
console.log(game.info);*/
function()
{
	console.log()
}