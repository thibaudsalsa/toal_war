/*global game:true*/
function init_card()
{
	var Icard = new Object();
	Icard.tab_nation = create_tab_nation();
	Icard.tab_bonus = create_tab_bonus();
	Icard.tab_proba_carte = calcule_proba(Icard);
	return (Icard);
}
/* creation des cartes bonus */
function create_tab_bonus()
{
	var tab_card = [];
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
	var tab_fct_bonus = [plagiat, soin, pret_a_la_banque,
						appuie_aerien, incendie, bluff,
						seisme, allie_inattendu, forcer_le_jeu, 
						d_une_pierre_de_carte, retentez_votre_chance, espion2];
	var prob = [4, 4, 6, 1, 4, 5, 1 , 6, 4, 2, 2, 4];
	for (let i = 0; i < id.length; i++)
	{
		var card = new Object();
		card.id = id[i];
		card.img = img[i];
		card.text = text[i];
		card.prob = prob[i];
		card.use = tab_fct_bonus[i];
		tab_card[i] = card;
	}
	return (tab_card);
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
function use_card(num_card, game)/* dans l'objet team */
{
	var color = ["bleu", "orange" , "rouge"];
	if (this.carte.length - 1 < num_card || num_card < 0)
		return ;
	if (num_card != 0)
	{
		game.info += "La team " + color[this.id - 1] + " " + this.carte[num_card].text + "\n"  ;
		this.carte[num_card].use(this, game);
		var tab_divise = [];
		for (let i = 0; i < this.carte.length; i++)
		{
			if (i != num_card)
				tab_divise.push(this.carte[i]);
		}
		this.carte = tab_divise;
	}
	else
		use_card_nation(this, game, num_card)
}
function return_card(num_card, game)/* dans l'objet Icard */
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
function plagiat(team, game)
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

function bluff(team, game)
{
}

function soin(team, game)
{
		team.city += 25;
	if (team.city > 600)
		team.city = 600;
}

function pret_a_la_banque(team, game)
{
	team.money += (Math.floor(Math.random() * (30 + 0))+30);
}
/* modification */
function appuie_aerien(team, game)
{
	var tab = return_enemie_team(team);
	var aleatoire = Math.floor(Math.random() * (2));
	if (aleatoire == 1)
		tab[0].city -= 60;
	else 
	{
		tab[tab.length - 1].city -= 60;
	}
}

function incendie(team, game)
{
	/*team unesed*/
	var aleatoire = Math.floor(Math.random() * (3));
	var moins_char = Math.floor(Math.random() * (26));
	var moins_avion = Math.floor(Math.random() * (26 - moins_char));
	var moins_soldat = Math.floor(Math.random() * (26 - moins_avion - moins_soldat));
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

function seisme(team, game)
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

function allie_inattendu(team, game)
{
	team.add("char",Math.floor(Math.random() * (6)) + 1);
	team.add("avion",Math.floor(Math.random() * (6)) + 1);
	team.add("soldat",Math.floor(Math.random() * (6)) + 1);
}
/* modification */
function forcer_le_jeu(team, game)
{
	var tab = return_enemie_team(team);
	var aleatoire = Math.floor(Math.random() * (2));
	if (aleatoire == 0 && tab[0].carte.length > 0)
		tab[0].use_card(Math.floor(Math.random() * (tab[0].carte.length)));
	else if (aleatoire == 1 && tab[tab.length - 1].carte.length > 0)
		tab[tab.length - 1].use_card(Math.floor(Math.random() * (tab[tab.length - 1].carte.length)));
}

function d_une_pierre_de_carte(team, game)
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

function retentez_votre_chance(team, game)
{
	team.money += 20;
}
/* modification */
function espion2(team, game)
{
	var tab = return_enemie_team(team);
	var color = ["bleu", "orange" , "rouge"];
	var aleatoire = Math.floor(Math.random() * (2));
	if (aleatoire == 0)
		game.info += "La team " + color[tab[0].id - 1] + " posséde : " + 
						tab[0].unit.char.length + " char, " + 
						tab[0].unit.avion.length + " avion, " +
						tab[0].unit.soldat.length + " soldat." ;
	else
		game.info += "La team " + color[tab[tab.length - 1].id - 1] + " posséde : " + 
						tab[tab.length - 1].unit.char.length + " char, " + 
						tab[tab.length - 1].unit.avion.length + " avion, " +
						tab[tab.length - 1].unit.soldat.length + " soldat." ;
}

function delete_unit(unit1, unit2)
{
	unit1.char = [];
	unit1.avion = [];
	unit1.soldat = [];
	unit2.char = [];
	unit2.avion = [];
	unit2.soldat = [];
}
function return_enemie_team(team, game)
{
	var tab_team = [game.team1, game.team2, game.team3];
	var tab = [];
	for (let i = 0; i < 3; i++)
	{
		if (tab_team[i].id != team.id && tab_team[i].city > 0)
			tab.push(tab_team[i]);
	}
	return (tab);
}
/* fin */