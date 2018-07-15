var card = new Object();
	card.title = 0;
 	card.img = 0;
	card.text = 0;
	card.effect = 0;
	function create_tab_card()
	{
		var tab_card = [];
		for ( i = 0; i < 60; i++)
			tab_card[i] = create_card();	
		return (tab_card);
	}
	
	function get_card(tab_card, num_card)
	{
		return (tab_card[num_card]);
	}

	
	
