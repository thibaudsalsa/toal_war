function do_dmg(unit, target)
{
	if (unit.x == target.x && unit.y == target.y)
	{
		target.pv -= unit.dmg;
		unit.hit = 1;
	}
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
			tmp = do_dmg(my_unit[i],
			ennemies.soldat[j]);
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
        if (unit.avion[i].x === posx && unit.avion[i].y === posy && unit.avion[i].hit == 0)
        {
            city_pv -= unit.avion[i].dmg;
            unit.avion[i].hit = 1;
        }
    }
    for (let i = 0; i < unit.soldat.length; i++)
    {
        if (unit.soldat[i].x === posx && unit.soldat[i].y === posy && unit.soldat[i].hit == 0)
        {
            city_pv -= unit.soldat[i].dmg;
            unit.soldat[i].hit = 1;
        }
    }
    for (let i = 0; i < unit.char.length; i++)
    {
        if (unit.char[i].x === posx && unit.char[i].y === posy && unit.char[i].hit == 0)
        {
            city_pv -= unit.char[i].dmg;
            unit.char[i].hit = 1;
        }
    }
    return (city_pv);
}

function attack_city()
{
    var unit;
    //les unités de la team 1 attaquent les villes
    unit = this.team1.unit.unit_left;
    this.team2.city = dmg_city(unit, this.team2.city, 1, 1);
    unit = this.team1.unit.unit_right;
    this.team3.city = dmg_city(unit, this.team3.city, 1, 1);
    //les unités de la team 2 attaquent les villes
    unit = this.team2.unit.unit_left;
    this.team3.city = dmg_city(unit, this.team3.city, 1, 1);
    unit = this.team2.unit.unit_right;
    this.team1.city = dmg_city(unit, this.team1.city, 1, 1);
    //les unités de la team 3 attaquent les villes
    unit = this.team3.unit.unit_left;
    this.team1.city = dmg_city(unit, this.team1.city, 1, 1);
    unit = this.team3.unit.unit_right;
    this.team2.city = dmg_city(unit, this.team2.city, 1, 1);
}

function back_hit(unit)
{
	for (let i = 0; i < unit.avion.length; i++)
		unit.avion[i].hit = 0;
	for (let i = 0; i < unit.soldat.length; i++)
		unit.soldat[i].hit = 0;
	for (let i = 0; i < unit.char.length; i++)
		unit.char[i].hit = 0;
}

function move_type(unit, x_operator, y_operator)
{
	for (let i = 0; i < unit.avion.length; i++)
	{
		if (unit.avion[i].hit == 0)
			move(unit.avion[i], x_operator, y_operator);
	}
	for (let i = 0; i < unit.soldat.length; i++)
	{
		if (unit.soldat[i].hit == 0)
			move(unit.soldat[i], x_operator, y_operator);
	}
	for (let i = 0; i < unit.char.length; i++)
	{
		if (unit.char[i].hit == 0)
			move(unit.char[i], x_operator, y_operator);
	}
	back_hit(unit);
}

function move(unit, x_operator, y_operator)
{
	if (x_operator === '+')
		unit.x += unit.speed / 100;
	else if (x_operator === '-')
		unit.x -= unit.speed / 100;
	if (y_operator === '+')
		unit.y += unit.speed / 100;
	else if (y_operator === '-')
		unit.y -= unit.speed / 100;
}

function move_unit()
{
	//move unit team1
	move_type(this.team1.unit.unit_left, '+', 'o');
	move_type(this.team1.unit.unit_right, 'o', '-');
	//move unit team2
	move_type(this.team2.unit.unit_left, '-', '+');
	move_type(this.team2.unit.unit_right, '-', 'o');
	//move unit team3
	move_type(this.team3.unit.unit_left, 'o', '-');
	move_type(this.team3.unit.unit_right, '+', '-');
}

function launch_left(type, nb)
{
	if (type === "char" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.char.push(this.unit.char[this.unit.char.length - 1]);
			this.unit.char.pop();
		}
	}
	else if (type === "avion" && this.unit.avion.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.avion.push(this.unit.avion[this.unit.avion.length - 1]);
			this.unit.avion.pop();
		}
	}
	else if (type === "soldat" && this.unit.soldat.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_left.soldat.push(this.unit.soldat[this.unit.soldat.length - 1]);
			this.unit.soldat.pop();
		}
	}
}

function launch_right(type, nb)
{
	if (type == "char" && this.unit.char.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.char.push(this.unit.char[0]);
			this.unit.char.pop();
		}
	}
	else if (type == "avion" && this.unit.avion.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.avion.push(this.unit.avion[0]);
			this.unit.avion.pop();
		}
	}
	else if (type == "soldat" && this.unit.soldat.length >= nb)
	{
		for (let i = 0; i < nb; i++)
		{
			this.unit.unit_right.soldat.push(this.unit.soldat[0]);
			this.unit.soldat.pop();
		}
	}
}