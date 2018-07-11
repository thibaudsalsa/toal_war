//              fonction de creation d'objet
//move size
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
}

function soldier(form, color, soldx)
{
    if (soldx >= 6)
        soldx = 6;
    form = set_pos(form, 1, soldx, 0);
    form = set_size(form, 0.1, 0.1, 0.4);
    var soldier = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(soldier, color.blue);
    soldx += 0.007;
    return soldx;
}

function plane(form, color, planx)
{
    if (planx >= 5)
        planx = 5;
    form = set_pos(form, 1, planx, 2);
    form = set_size(form, 0.1, 0.4, 0.1);
    var soldier = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(soldier, color.blue);
    planx += 0.01;
    return planx;
}

function tank(form, color, tankx)
{
    if (tankx >= 6)
        tankx = 6;
    form = set_pos(form, 1, tankx, 0);
    form = set_size(form, 0.2, 0.2, 0.1);
    var soldier = form.shape.Prism(form.Point(form.pos.x, form.pos.y, form.pos.z), form.size.x, form.size.y, form.size.z);
    form.iso.add(soldier, color.blue);
    tankx += 0.003;
    return tankx;
}

function create_castel(form, color)
{
    var briq;
    var tmp_c = color.blue;
    form = set_pos(form, 1, 1, 0);
    for (let j = 0; j < 3; j += 1)
    {
        if (j === 1)
        {
            tmp_c = color.red;
            form = set_pos(form, 7, 1, 0);
        }
        if (j === 2)
        {
            tmp_c = color.orange;
            form = set_pos(form, 1, 7, 0);
        }
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