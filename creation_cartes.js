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
	game.info += "Team : " + this.id + " " +this.carte[num_card].text + "\n"  ;
	this.carte[num_card].use(num_card, this);
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
	if (num_card >= 0 && num_card < game.card.tab_nation.length)
		this.carte.push(this.tab_nation[num_card]);
	if (num_card == -1)
		this.carte.push(this.tab_proba_carte[(Math.floor(Math.random() * (this.tab_proba_carte.length + 0)))]);
}
/* fin */
/* creation du tableau avec les cartes et leurs probabilités */
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