function do_dmg(unit, target)
{
	if (unit.x == target.x && unit.y == target.y)
		target.pv -= unit.dmg;
	else
		return (null);
	return (target);
}

function die(tab)
{
	var tmp = [];
	
	for (let i = 0; i < tab.length; i++)
	{
		if (tab[i].pv > 0)
			tmp.push(tab[i]);
	}
	return (tmp);
}

function unit_attack(my_unit, ennemies)
{
    var tmp;
    var i = 0;
    //attack les chars
	for (i; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.char.length; j++)
		{
			tmp = do_dmg(my_unit[i], ennemies.char[j]);
			if (tmp != null)
			{
				ennemies.char[j] = tmp;
				break;
			}
		}
	}
	//attaquent les soldats
	for (i; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.soldat.length; j++)
		{
			tmp = do_dmg(my_unit[i], ennemies.soldat[j]);
			if (tmp != null)
			{
				ennemies.soldat[j] = tmp;
				break;
			}
		}
	}
	//attaquent les avions
	for (i; i < my_unit.length; i++)
	{
		for (let j = 0; j < ennemies.avion.length; j++)
		{
			tmp = do_dmg(my_unit[i], ennemies.avion[j]);
			if (tmp != null)
			{
				ennemies.avion[j] = tmp;
				break;
			}
		}
	}
	ennemies.char = die(ennemies.char);
	ennemies.soldat = die(ennemies.soldat);
	ennemies.avion = die(ennemies.avion);
	return (ennemies);
}

function fight(my_units, ennemies)
{
	//les avions attaquent
	ennemies = unit_attack(my_units.avion, ennemies);
	my_units = unit_attack(ennemies.avion, my_units);
	//les soldats attaquent
	ennemies = unit_attack(my_units.soldat, ennemies);
	my_units = unit_attack(ennemies.soldat, my_units);
	//les chars attaquent
	ennemies = unit_attack(my_units.char, ennemies);
	my_units = unit_attack(ennemies.char, my_units);
	var tab = [my_units, ennemies];
	return (tab);
}

function attack()
{
	var tab;
	tab = fight(this.team1.unit.unit_left, this.team2.unit.unit_right);
	this.team1.unit.unit_left = tab[0];
	this.team2.unit.unit_right = tab[1];
	tab = fight(this.team2.unit.unit_left, this.team3.unit.unit_right);
	this.team2.unit.unit_left = tab[0];
	this.team3.unit.unit_right = tab[1];
	tab = fight(this.team3.unit.unit_left, this.team1.unit.unit_right);
	this.team3.unit.unit_left = tab[0];
	this.team1.unit.unit_right = tab[1];
}

function dmg_city(unit, city_pv, posx, posy)
{
    for (let i = 0; i < unit.avion.length; i++)
    {
        if (unit.avion[i].x === posx && unit.avion[i].y === posy)
            city_pv -= unit.avion[i].dmg;
    }
    for (let i = 0; i < unit.soldat.length; i++)
    {
        if (unit.soldat[i].x === posx && unit.soldat[i].y === posy)
            city_pv -= unit.soldat[i].dmg;
    }
    for (let i = 0; i < unit.char.length; i++)
    {
        if (unit.char[i].x === posx && unit.char[i].y === posy)
            city_pv -= unit.char[i].dmg;
    }
    return (city_pv);
}

function attack_city()
{
    var unit;
    var city;
    //les unités de la team 1 attaquent les villes
    unit = this.team1.unit.unit_left;
    city = this.team2.city;
    unit = this.team1.unit.unit_right;
    city = this.team3.city;
    //les unités de la team 2 attaquent les villes
    unit = this.team2.unit.unit_left;
    city = this.team3.city;
    unit = this.team2.unit.unit_right;
    city = this.team1.city;
    //les unités de la team 3 attaquent les villes
    unit = this.team3.unit.unit_left;
    city = this.team1.city;
    unit = this.team3.unit.unit_right;
    city = this.team2.city;
}