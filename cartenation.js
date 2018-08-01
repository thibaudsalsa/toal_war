function create_tab_nation(nb_card)
{
	var tab_card = [nb_card];
	var id = ["Dubai","France"];/* -----------------------------------*/
	var img = ["pas d'image", "pas d'image", "", ""];
	var text = ["à utiliser une carte nation",
				"à utiliser une carte nation"];
	var tab_fct_nation = [dubai, france];
	for (let i = 0; i < id.length; i++)
	{
		var card = new Object();
		card.id = id[i];
		card.img = img[i];
		card.text = text[i];
		card.use = tab_fct_nation[i];
		tab_card[i] = card;
	}
	return (tab_card);
}

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