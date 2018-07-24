var wss = new WebSocket('wss://localhost:40510');
function try_connect()
{
    var msg = JSON.stringify(document.getElementById("choose_nation").value);
    wss.send(msg);
}

function get_connect(msg)
{
    if (msg === "start")
    {
        document.getElementById("display_game").style.display = "";
        document.getElementById("choose").style.display = "none";
    }
}

function refresh_game()
{
    console.log("game is refresh")
}