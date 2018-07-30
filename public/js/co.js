/*global unit_to_draw:true red_city:true blue_city:true orange_city:true Notification*/
var wss = new WebSocket('ws://145.239.47.23:40510');

Notification.requestPermission(function(status) {
    if (Notification.permission !== status)
        Notification.permission = status;
});

wss.onmessage = function (ev)
{
    if (ev.data == "start")
    {
        document.getElementById("display_game").style.display = "";
        document.getElementById("wait").style.display = "none";
        document.getElementById("canvas01").style.display = "none";
        document.getElementById("canvas02").style.display = "none";
        document.getElementById("sound").src = "audio.ogg";
        var notification = new Notification("La partie à commencée");
    }
    else if (ev.data == "reset")
        replay();
    else
        refresh_game(ev.data);
};

function try_connect()
{
    var msg = new Object();
    msg.order = "connect";
    msg.msg = document.getElementById("choose_nation").value;
    document.getElementById("choose").style.display = "none";
    document.getElementById("wait").style.display = "";
    msg = JSON.stringify(msg);
    wss.send(msg);
}

function attack(direction)
{
    var type = document.getElementById("attaque_" + direction + "_unit").value;
    var nb = parseInt(document.getElementById("attaque_" + direction + "_nb").value, 10);
    var tmp = new Object();
    var msg;
    tmp.order = "attack";
    tmp.type = type;
    tmp.nb = nb;
    tmp.direction = direction;
    msg = JSON.stringify(tmp);
    wss.send(msg);
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

var notif = 0;
function replay()
{
    if (notif === 0)
    {
        var notification = new Notification("La partie est finie");
        notif++;
    }
    document.location.href="http://145.239.47.23:3000/";
}

function display_carte(tab_carte, info)
{
    var tmp_info = 0;
    var tmp_info_msg = "";
    for (let i = 0; i < info.length; i++)
    {
        if (info[i] === '\n')
        tmp_info += 1;
    }
    for (let i = 0, j = 0; i < info.length; i++)
    {
        if (info[i] === '\n')
        {
            j += 1;
            if (j >= tmp_info - 2)
                tmp_info_msg += "<br>";
        }
        else if (j >= tmp_info - 3)
            tmp_info_msg += info[i];
    }
    if (document.getElementById("information").innerHTML != tmp_info_msg)
        document.getElementById("information").innerHTML = tmp_info_msg;
    document.getElementById("carte_display").innerHTML = "";
    for (let i = 0; i < tab_carte.length; i++)
    {
        document.getElementById("carte_display").innerHTML += i + ": " + tab_carte[i].id + "<br>";
    }
}

function confort_de_jeu(color, msg)
{
    if (color == "BLEU")
    {
        document.getElementsByClassName("en_left")[0].innerHTML = "Attaquer les oranges";
        document.getElementsByClassName("en_left")[1].innerHTML = "Attaquer les oranges";
        document.getElementsByClassName("en_right")[0].innerHTML = "Attaquer les rouges";
        document.getElementsByClassName("en_right")[1].innerHTML = "Attaquer les rouges";
    }
    else if (color == "ORANGE")
    {
        document.getElementsByClassName("en_left")[0].innerHTML = "Attaquer les rouges";
        document.getElementsByClassName("en_left")[1].innerHTML = "Attaquer les rouges";
        document.getElementsByClassName("en_right")[0].innerHTML = "Attaquer les bleus";
        document.getElementsByClassName("en_right")[1].innerHTML = "Attaquer les bleus";
    }
    else if (color == "ROUGE")
    {
        document.getElementsByClassName("en_right")[0].innerHTML = "Attaquer les oranges";
        document.getElementsByClassName("en_right")[1].innerHTML = "Attaquer les oranges";
        document.getElementsByClassName("en_left")[0].innerHTML = "Attaquer les bleus";
        document.getElementsByClassName("en_left")[1].innerHTML = "Attaquer les bleus";
    }
}

function refresh_game(msg)
{
    unit_to_draw = [];
    //get unit on the left
    msg = JSON.parse(msg);
    if (msg.win === true)
    {
        document.getElementById("display_game").style.display = "none";
        document.getElementById("victory").style.display = "";
        document.getElementById("winner").innerHTML = msg.winner;
        var notification = new Notification("L'équipe "+ msg.winner + " à gagnée");
    }
    display_unit(msg.team1.unit.unit_left);
    display_unit(msg.team2.unit.unit_left);
    display_unit(msg.team3.unit.unit_left);
    //get unit on the right
    display_unit(msg.team1.unit.unit_right);
    display_unit(msg.team2.unit.unit_right);
    display_unit(msg.team3.unit.unit_right);
    // recupere si les villes sont vivantes ou non
    display_carte(msg.carte, msg.info);
    blue_city = msg.team1.city;
    orange_city = msg.team2.city;
    red_city = msg.team3.city;
    // actualise les informations sur la page
    document.getElementById("couleur_ville").innerHTML = msg.couleur_ville;
    confort_de_jeu(msg.couleur_ville, msg);
    if (msg.city < 0 && document.getElementById("gameplay").style.display != "none")
    {
        var notification = new Notification("Votre ville est détruite");
        document.getElementById("gameplay").style.display = "none";
    }
    else
    {
        document.getElementById("argent").innerHTML = "Argent: " + parseInt(msg.argent, 10);
        document.getElementById("cité").innerHTML = "Cité: " + parseInt(msg.city) + "pv";
        document.getElementById("soldat").innerHTML = msg.soldat;
        document.getElementById("char").innerHTML = msg.char;
        document.getElementById("avion").innerHTML = msg.avion;
    }
}