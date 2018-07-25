var Icard = new Object(); 
Icard.tab_nation = create_tab_nation(4/*nombre de cartes*/);
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
		card.use = use;
		tab_card[i] = card;	
	}

	return (tab_card);
}