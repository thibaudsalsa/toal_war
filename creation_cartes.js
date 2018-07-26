/*var x = init_card();
console.log(x.);*/
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
		return (this.tab_nation[(Math.floor(Math.random() * (this.tab_nation.length + 0)))]);
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
		this.add("char",numero * 2);
		this.add("avion",numero * 2);
		this.add("soldat",numero * 2);
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