/* 
creation tableau et carte
*/
function create_card()
{
	var card = new Object();
		card.title = 0;
		card.img = 0;
		card.text = 0;
		card.effect = 0;
	return (card);
}

function create_tab_card()
{
	var tab_card = [];
	for ( i = 0; i < 60; i++)
		tab_card[i] = create_card();	
	return (tab_card);
}
/*
fonction pour obtenir des infos sur les cartes du tableau
*/
function get_card(tab_card, num_card)
{
	return (tab_card[num_card]);
}

/* 4 petites fonction*/
function get_title_card(card_tab, card)
{
	return (card_tab[card].title);
}

function get_img_card(card_tab,card)
{
	return (card_tab[card].img);
}

function get_text_card(card_tab,card)
{
	return (card_tab[card].text);
}

function get_effect_card(card_tab,card)
{
	return (card_tab[card].effect);
}

/* ou une avec 4 if
function get_info_card(card_tab, card, info)
{
	if (info == "title")
		return (card_tab[card].title);
	if (info == "img")
		return (card_tab[card].img);
  	if (info == "text")
		return (card_tab[card].text);
	if (info == "effect")
		return (card_tab[card].effect);
}*/
/* 
ajout d'info carte
*/
function add_title_card(card_tab,card,title)
{
	card_tab[card].title = title;
}

function add_img_card(card_tab,card,img)
{
	card_tab[card].img = img;
}

function add_text_card(card_tab,card,text)
{
	card_tab[card].text = text;
}

function add_effect_card(card_tab,card,effect)
{
	card_tab[card].effect = effect;
}
/* fonction choix d'une carte aleatoire */
function random_card(card_tab)
{
	var num_card = Math.floor(Math.random() * (60 - 0) + 0);
	return (card_tab[num_card])
}

/* creer une fonction qui prend liste d'image, titre, effect, text et qui met toutes ces infon dans la liste des cartes.*/ 
var card_tab = create_tab_card();
/*console.log(card_tab);*/
console.log(get_effect_card(card_tab,54));
add_effect_card(card_tab,54,"sv")
console.log(get_effect_card(card_tab,54));
console.log(random_card(card_tab))

