var x = init_card();
console.log(x.tab_nation[0])

function init_card()
{
	var Icard = new Object(); 
	Icard.tab_nation = create_tab_nation(4/*nombre de cartes*/);
	Icard.tab_bonus = create_tab_bonus(4);
	Icard.add_card_nation = add_fct_nation(Icard);
	Icard.add_card_bonus = add_card_bonus(Icard);
	return (Icard);
}
/* CREER LE TABLEAU DE CARTES nation*/
function create_tab_nation(nb_card)
{
	var tab_card = [nb_card];
	var id = ["vatican", "liban", "dubai", "kosovo"];
	var img = ["image1", "image2", "image3", "image4"];	
	var text = ["JE SAIS PAS", "JE SAIS PAS", "JE SAIS PAS", "JE SAIS PAS"];
	var prob = [0.25, 0.25, 0.25, 0.25]; 	
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
/* CREER LE TABLEAU DE CARTES BONUS */
function create_tab_bonus(nb_card)
{
	var tab_card = [nb_card];
	var id = ["seismes", "Allié inatendu 1", "Prêt à la banque 1", "Appuie aérien"];
	var img = ["image1", "image2", "image3", "image4"];	
	var text = ["JE SAIS PAS", "JE SAIS PAS", "JE SAIS PAS", "JE SAIS PAS"];
	var prob = [0.25, 0.25, 0.25, 0.25]; 	
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

function use_card(num_card)
{
	this.carte[num_card].use();
}

function add_fct_nation(Icard)
{
	Icard.tab_nation[0].use = espion1;
	Icard.tab_nation[1].use = espion2;
	Icard.tab_nation[2].use = effort_diplomatique;
	Icard.tab_nation[3].use = pret_a_la_banque;
	/*this.tab_nation[4].
	this.tab_nation[5].
	this.tab_nation[6].
	this.tab_nation[7].*/
}

function add_fct_bonus(Icard)
{
	/*Icard.tab_bonus[0].
	Icard.tab_bonus[1].
	Icard.tab_bonus[2].
	Icard.tab_bonus[3].
	Icard.tab_bonus[4].
	Icard.tab_bonus[5].*/
}

/* functions des cartes*/
function pret_a_la_banque(numero)
{
	this.money += numero*5;
}
function allie_inattendu(numero)
{
	var nb_unit = this.unit.char.length + this.unit.avion.length + this.unit.soldat.length;
	if (nb_unit + 3*numero < 150);
	{	
		this.add("char",numero*2);
		this.add("avion",numero*2);
		this.add("soldat",numero*2);
		return ("True");	
	}
	return ("False");
}	
function espion1(team, see_unit)
{
	if (see_unit == "char")	
		return (team.unit.char.length);	
	if (see_unit == "avion")
		return (team.unit.avion.length);
	if (see_unit == "soldat")
		return (team.unit.soldat.length);
	return(False);
}
function espion2(team)
{
	return (team.unit.char.length + team.unit.avion.length + team.unit.soldat.length);
}
function effort_diplomatique(team2, team3)
{
	this.money += 30
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







