function create_tab_nation()
{
	var tab_card = [];
	var id = ["Dubai", "France", "Kosovo", "Monaco", "Portugal", "Corée du nord"];/* -----------------------------------*/
	var img = ["", "", "", "", "", ""];
	var text = ["a echangé son argent avec celle d'un autre joueur.",
				"a arreté toutes ses unitées.",
				"a rendu pauvre tout les joueurs... Ils ne vous reste que vos cartes...",
				"a gagné 12 unitées, 4 de chaque.",
				"a gagne 1000 pv grace des murs plus solides",
				"a utilisé une carte nation"];
	var prix = [100, 100, 100, 100, 100, 100];
	var nomb_util = [0, 0, 0, 0, 0, 0]
	var tab_fct_nation = [dubai, france, kosovo, monaco, portugal, coree_du_nord];
	for (let i = 0; i < id.length; i++)
	{
		var card = new Object();
		card.id = id[i];
		card.img = img[i];
		card.text = text[i];
		card.prix = prix[i];
		card.nomb_util = nomb_util[i];
		card.use = tab_fct_nation[i];
		tab_card[i] = card;
	}
	return (tab_card);
}

function get_nation(game)
{
	tab_team = [game.team1, game.team2, game.team3]
	for ( let i =0; i < tab_team.length; i++)
	{
		for (let j = 0; j < game.carte.tab_nation.length; j++)
		{
			if (tab_team[i].name == game.carte.tab_nation[j].id)
				tab_team[i].carte.push(game.carte.tab_nation[j]);
		}	
	}
}

function use_card_nation(team, game, num_card)
{
	var color = ["bleu", "orange" , "rouge"];
	if (team.carte[num_card].nomb_util == 0)
	{
		team.carte[num_card].nomb_util = 1;
		game.info += "La team " + color[team.id - 1] + " " + team.carte[num_card].text + "\n"  ;
		team.carte[num_card].use(team, game);
	}
	else
	{
		if (team.money < team.carte[num_card].prix)
			return;
		else
			game.info += "La team " + color[team.id - 1] + " " + team.carte[num_card].text + "\n"  ;
			team.carte[num_card].use(team, game);
			team.money -= team.carte[num_card].prix;
	}
}
/* function des cartes nation */ 
function dubai(team, game)
{
	var tab_team = [game.team1,game.team2,game.team3];
	var tab = return_enemie_team(team, game);
	var gold = team.money;
	
	var aleatoire = Math.floor(Math.random() * (2 + 0));
	if (aleatoire == 1)
	{
		team.money = tab[0].money;
		tab[0].money = gold;
	}
	else 
	{	
		team.money = tab_team[1].money;
		tab_team[1].money = gold;
	}
}

function france(team, game)
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

function kosovo(team, game)
{
	var tab_team = [game.team1, game.team2, game.team3];
	for (let i = 0; i < tab_team.length; i++)
	{
		tab_team[i].money = 0;
		tab_team[i].unit.char = [];
		tab_team[i].unit.soldat = [];
		tab_team[i].unit.avion = [];
		tab_team[i].unit.unit_left.char = [];
		tab_team[i].unit.unit_left.soldat = [];
		tab_team[i].unit.unit_left.avion = [];
		tab_team[i].unit.unit_right.char = [];
		tab_team[i].unit.unit_right.soldat = [];
		tab_team[i].unit.unit_right.avion = [];
	}
}

function monaco(team, game)
{
	for (let i = 0; i < 4; i++)
	{
		team.money += 15;
		team.add("soldat", 1);
		team.add("char", 1);
		team.add("avion", 1);
	}
}

function portugal(team, game)
{
	team.city += 1000;
}

function coree_du_nord(team, game)
{
	var tab = return_enemie_team(team, game);
	add_100_avion(team);
	if (tab.length > 1)
	{
		team.launch_right("avion", 100);
		add_100_avion(team);
		team.launch_left("avion", 100);
	}
	else
	{
		console.log(team.id, tab[0].id)
		if (tab[0].id == team.id + 1 || tab[0].id == team.id - 2)
		{	
			team.launch_left("avion", 100);
		}
		else 
			team.launch_right("avion", 100);
	}
}
function add_100_avion(team)
{
	team.money += 5;
	team.add("avion", 100);
	for (let i = 0; i < 100; i++)
	{
		team.unit.avion[i].pv = 0.1;
		team.unit.avion[i].dmg = 0;
	}
}
/* fin */ 