var soldat = [-1];
var char = [-1];
var avion = [-1];
var my_money = 200;
//              creation de la map
function make_game()
{
    /*global Isomer*/
    var iso = new Isomer(document.getElementById("art"));
    var color = Isomer.Color;
    var Point = Isomer.Point;
    var Path = Isomer.Path;
    var Shape = Isomer.Shape

    //               couleur
    var Color = new Object();
    Color.green = new color(76, 187, 23);
    Color.blue = new color(0, 0, 200);
    Color.red = new color(200, 0, 0);
    Color.orange = new color(253, 106, 2);
    

    //              init objet
    // objet position
    var pos = new Object();
    pos.x = 0;
    pos.y = 0;
    pos.z = 0;
    // objet taille
    var size = new Object();
    size.x = 0;
    size.y = 0;
    size.z = 0;
    //objet item
    var form = new Object();
    form.iso = iso;
    form.Point = Point;
    form.color = null;
    form.pos = pos;
    form.size = size;
    form.path = Path;
    form.shape = Shape;
    form = set_pos(form, 0, 0, 0);
    form = set_size(form, 8, 8, 0.2);
    
    
    //create map
    make_battleground(form, Color);
    create_castel(form, Color);
    for (let i = 0; soldat[i] != -1; i++)
        soldat[i] = soldier(form, Color, soldat[i]);
    for (let i = 0; avion[i] != -1; i++)
        avion[i] = plane(form, Color, avion[i]);
    for (let i = 0; char[i] != -1; i++)
        char[i] = tank(form, Color, char[i]);
    my_money += 0.01;
    document.getElementById("argent").innerHTML = "Argent: " + parseInt(my_money, 10);
    requestAnimationFrame(make_game)
}

make_game();