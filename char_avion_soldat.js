var team_unit1 = create_team_unit();
var team_unit2 = create_team_unit();
var team_unit3 = create_team_unit();

function create_char(){
	var char=new Object();
		char.pv = 0,
		char.dmg = 0,
		char.speed = 0,
		char.color = 0,
		char.x = 0,
		char.y = 0,
		char.z = 0,	
        char.sizex = 0,
		char.sizey = 0,
		char.sizez = 0
	return(char);
}

function create_soldat(){
	var soldat=new Object();
		soldat.pv = 0,
		soldat.dmg = 0,
		soldat.speed = 0,
		soldat.color = 0,
		soldat.x = 0,
		soldat.y = 0,
		soldat.z = 0,	
        soldat.sizex = 0,
		soldat.sizey = 0,
		soldat.sizez = 0
	return (soldat);
}

function create_avion(){
	var avion=new Object();
		avion.pv = 0,
		avion.dmg = 0,
		avion.speed = 0,
		avion.color = 0,
		avion.x = 0,
		avion.y = 0,
		avion.z = 0,	
        avion.sizex = 0,
		avion.sizey = 0,
		avion.sizez = 0
	return (avion);
}

function create_team_unit(){
	var team_unit=new Object();
		team_unit.char = [],
		team_unit.soldat = [],
		team_unit.avion = [],
		team_unit.char_in = [],
		team_unit.soldat_in = [],
		team_unit.avion_in = []
	return (team_unit);
}

function add_unit(team_unit1,team_unit2,team_unit3,team,type){
	if (team == 1){
		type_unit(team_unit1,type);
	}
	if (team == 2){
	    type_unit(team_unit2,type);
	}
	if (team == 3){
		type_unit(team_unit3,type);
	}
}

function type_unit(team_unit,type){
	if (type == "char"){
		team_unit.char.push(create_char());
	}
	if (type == "avion"){
		team_unit.avion.push(create_avion());	
	}
	if (type == "soldat"){
		team_unit.soldat.push(create_soldat());
	}
}
/*add_unit(team_unit1,team_unit2,team_unit3,3,"soldat");
add_unit(team_unit1,team_unit2,team_unit3,3,"soldat");
console.log(team_unit3.soldat);*/









