init_game();

function init_game()
{
	var tab_card = create_card_tab();
	console.log(tab_card[0].id);
}

function create_card()
{
	var card = new Object();
	card.id = "allooo1";
	card.img = "allooo2";
	card.text = "allooo3";
	card.prob = "allooo4";
	return (card);
}

function create_card_tab()
{
	var tab_card = [20];
	for (let i = 0; i < tab_card.length; i++)
		tab_card[i] = create_card();
	return (tab_card);
}
