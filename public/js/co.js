/*global unit_to_draw:true red_city:true blue_city:true orange_city:true*/
var wss = new WebSocket('ws://145.239.47.23:40510');

wss.onmessage = function (ev)
{
    if (ev == "start")
    {
        document.getElementById("display_game").style.display = "";
        document.getElementById("choose").style.display = "none";
    }
    else
        refresh_game(ev);
};

function try_connect()
{
    var msg = JSON.stringify(document.getElementById("choose_nation").value);
    wss.send(msg);
}

function attack(direction)
{
    var type = document.getElementById("attaque_" + direction + "_unit").value;
    var nb = document.getElementById("attaque_" + direction + "_nb").value;
    order("attack", type, nb, direction);
}

function order(what, type, nb, direction)
{
    var tmp = new Object();
    tmp.order = what;
    tmp.type = type;
    tmp.nb = nb;
    var msg = JSON.stringify(tmp);
    wss.send(msg);
}

function display_unit(team)
{
    for (let i = 0; i < team.soldat.length; i++)
        unit_to_draw.push(team.soldat[i]);
    for (let i = 0; i < team.char.length; i++)
        unit_to_draw.push(team.char[i]);
    for (let i = 0; i < team.avion.length; i++)
        unit_to_draw.push(team.avion[i]);
}

function refresh_game(msg)
{
    unit_to_draw = [];
    //get unit on the left
    display_unit(msg.team1.unit.unit_left);
    display_unit(msg.team2.unit_left);
    display_unit(msg.team3.unit_left);
    //get unit on the right
    display_unit(msg.team1.unit.unit_right);
    display_unit(msg.team2.unit.unit_right);
    display_unit(msg.team3.unit.unit_right);
    // recupere si les villes sont vivantes ou non
    blue_city = msg.team1.city;
    orange_city = msg.team1.city;
    red_city = msg.team1.city;
    // actualise les informations sur la page
    document.getElementById("argent").innerHTML = "Argent: " + msg.argent;
    document.getElementById("cité").innerHTML = "Cité: " + msg.city + "pv";
    document.getElementById("soldat").innerHTML = msg.soldat;
    document.getElementById("char").innerHTML = msg.char;
    document.getElementById("avion").innerHTML = msg.avion;
}