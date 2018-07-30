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
	var img = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
	var text = ["a utilisé une carte bonus.", 
				"a utilisé une carte bonus.", 
				"a utilisé une carte bonus.",
				"a utilisé un Appuie aérien.",
				"a declanché un incendie.",
				"a utilisé une carte bonus.",
				"a fait tremblé le sol.",
				"a utilisé une carte bonus.",
				"vous a forcé à utiliser une carte.",
				"a utilisé une carte bonus.",
				"a utilisé une carte bonus.",
				"a une information à vous donner."];
	var prob = [4, 4, 6, 1, 4, 5, 1 , 6, 4, 2, 2, 4];
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
						d_une_pierre_de_carte, retentez_votre_chance, espion2];/* -----------------------------------*/
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

function bluff()
{
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
	/*team unesed*/
	var aleatoire = Math.floor(Math.random() * (3));
	var moins_char = Math.floor(Math.random() * (26));
	var moins_avion = Math.floor(Math.random() * (26 - moins_char));
	var moins_soldat = Math.floor(Math.random() * (moins_avion - moins_soldat));
	if (aleatoire === 0)
	{
		no_negativ_unit(game.team1.unit.char, moins_char);
		no_negativ_unit(game.team1.unit.avion, moins_avion);
		no_negativ_unit(game.team1.unit.soldat, moins_soldat);
	}
	else if (aleatoire === 1)
	{
		no_negativ_unit(game.team2.unit.char, moins_char);
		no_negativ_unit(game.team2.unit.avion, moins_avion);
		no_negativ_unit(game.team2.unit.soldat, moins_soldat);
	}
	else
	{
		no_negativ_unit(game.team3.unit.char, moins_char);
		no_negativ_unit(game.team3.unit.avion, moins_avion);
		no_negativ_unit(game.team3.unit.soldat, moins_soldat);
	}
}

function no_negativ_unit(unit, nb)
{
	for (let i = 0; i < nb && unit.length; i++)
		unit.pop();
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