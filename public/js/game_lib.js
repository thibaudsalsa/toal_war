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
    var countour = form.shape.Prism(form.Point(-10, -10, form.pos.z), 25, 25, 0.1);
    form.iso.add(countour, color.water);
    var battleground = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(battleground, color.green);
}

function draw_unit(form, unit)
{
    var draw;
    /*global Isomer*/
    var color_fix = new Isomer.Color(unit.color[0], unit.color[1], unit.color[2]);
    form = set_pos(form, unit.x, unit.y, unit.z);
    form = set_size(form, unit.sizex, unit.sizey, unit.sizez);
    draw = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(draw, color_fix);
}


//creer les building d'une ville
function castel_team(form, color)
{
    var briq;
    form = set_size(form, 0.25, 0.25, 1.8);
    //big building
    briq = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(briq, color);
    form.pos.x += 0.7;
    form = set_size(form, 0.25, 0.25, 0.9);
    //medium building
    briq = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(briq, color);
    form.pos.x -= 0.5;
    form.pos.y -= 0.7;
    form = set_size(form, 0.25, 0.25, 0.5);
    //small building
    briq = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(briq, color);
    //litte building
    form.pos.x -= 0.7;
    form.pos.y += 0.7;
    form = set_size(form, 0.25, 0.25, 0.2);
    briq = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(briq, color);
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
        else if (j === 2)
        {
            tmp_c = color.orange;
            form = set_pos(form, 1, 7, 0);
            tmp_life = orange_city;
        }
        if (tmp_life > 0)
            castel_team(form, tmp_c);
    }
}