//              fonction de creation d'objet
//move size
/* global blue_city orange_city red_city my_teams*/
function set_size(form, x, y, z)
{
    form.size.x = x;
    form.size.y = y;
    form.size.z = z;
    return (form);
}
//move pos
function set_pos(form, x, y, z)
{
    form.pos.x = x;
    form.pos.y = y;
    form.pos.z = z;
    return (form);
}
//creation de la map
function make_battleground(form, color)
{
    var battleground = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(battleground, color.green);
    var countour = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(countour.rotateX(10, 0, 1), color.blue);
}

function soldier(form, color, soldx)
{
    var Soldier = new Object();
    Soldier.dmg = 1;
    Soldier.range = 0;
    Soldier.pv = 10;
    Soldier.type = 'soldat';
    Soldier.speed = 0.004;
    if (soldx >= 6)
        soldx = 6;
    form = set_pos(form, 1, soldx, 0);
    form = set_size(form, 0.1, 0.1, 0.4);
    var soldier = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(soldier, color.blue);
    attack_city(soldx, Soldier, 'orange');
    soldx += Soldier.speed;
    return soldx;
}

function plane(form, color, planx)
{
    var Plane = new Object();
    Plane.dmg = 0.5;
    Plane.range = 0;
    Plane.pv = 2;
    Plane.type = 'avion';
    Plane.speed = 0.01;
    if (planx >= 5)
        planx = 5;
    form = set_pos(form, 1, planx, 2);
    form = set_size(form, 0.1, 0.4, 0.1);
    var soldier = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(soldier, color.blue);
    attack_city(planx, Plane, 'orange');
    planx += Plane.speed;
    return planx;
}

function tank(form, color, tankx)
{
    var Tank = new Object();
    Tank.dmg = 10;
    Tank.range = 2;
    Tank.pv = 100;
    Tank.type = 'char'
    Tank.speed = 0.001;
    if (tankx >= 6)
        tankx = 6;
    form = set_pos(form, 1, tankx, 0);
    form = set_size(form, 0.2, 0.2, 0.1);
    var soldier = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(soldier, color.blue);
    attack_city(tankx, Tank, 'orange');
    tankx += Tank.speed;
    return tankx;
}

function create_castel(form, color)
{
    var briq;
    var tmp_c = color.blue;
    var tmp_life = blue_city;
    form = set_pos(form, 1, 1, 0);
    for (let j = 0; j < 3; j += 1)
    {
        if (j === 1)
        {
            tmp_c = color.red;
            form = set_pos(form, 7, 1, 0);
            tmp_life = red_city;
        }
        if (j === 2)
        {
            tmp_c = color.orange;
            form = set_pos(form, 1, 7, 0);
            tmp_life = orange_city
        }
        if (tmp_life > 0)
        {
            form = set_size(form, 0.25, 0.25, 1.8);
            //big building
            briq = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
            form.iso.add(briq, tmp_c);
            form.pos.x += 0.7;
            form = set_size(form, 0.25, 0.25, 0.9);
            //medium building
            briq = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
            form.iso.add(briq, tmp_c);
            form.pos.x -= 0.5;
            form.pos.y -= 0.7;
            form = set_size(form, 0.25, 0.25, 0.5);
            //small building
            briq = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
            form.iso.add(briq, tmp_c);
            //litte building
            form.pos.x -= 0.7;
            form.pos.y += 0.7;
            form = set_size(form, 0.25, 0.25, 0.2);
            briq = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
            form.iso.add(briq, tmp_c);
        }
    }
}

/*global my_money*/
/*global soldat*/
function add_soldier()
{
    if (my_money < 50)
        return;
    for (var i = 0; soldat[i] != -1; i++);
    soldat[i] = 1.3;
    soldat.push(-1);
    my_money -= 50;
}

/*global char*/
function add_tank()
{
    if (my_money < 100)
        return;
    for (var i = 0; char[i] != -1; i++);
    char[i] = 1.3;
    char.push(-1);
    my_money -= 100;
}

/*global avion*/
function add_plane()
{
    if (my_money < 150)
        return;
    for (var i = 0; avion[i] != -1; i++);
    avion[i] = 1.3;
    avion.push(-1);
    my_money -= 150;
}

function attack_city(pos, unit, city)
{
    if (pos + unit.range < 7 && pos + unit.range < 7)
        return;
    switch (city) {
        case 'blue':
            if (blue_city > 0  && my_teams != "bleu")
                blue_city -= unit.dmg;
            break;
        case 'red':
            if (red_city > 0 && my_teams != "rouge")
                red_city -= unit.dmg;
            break;
        case 'orange':
            if (orange_city > 0 && my_teams != "orange")
                orange_city -= unit.dmg;
            break;
    }
}