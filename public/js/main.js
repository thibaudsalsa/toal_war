var token = "";
var job = "Dev Front end";
var list_of_job = [100, 50, 5, 55, 56, 56, 56, 120];
var date_begin = 2018;
var job_name = "Exemple";
var date_to_find = "01-01-2016";
var predict_error = "";

//use foundation
$(function() {
  $(document).foundation();
});

graphical(list_of_job, date_begin, job, job_name);
token = get_token();

 //do a request to have the token gave by the server

function get_token()
{
    var url = "http://bbsn-server.eu/server/connect.php";
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader('Authorization', 'Basic YWRtaW46YWRtaW4=');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            var tmp = JSON.parse(request.response);
            token = tmp.token;
        }
    }
    request.send(null);
}

//graphique
function graphical(list_of_job, date_begin, job, job_name)
{
    Highcharts.chart('graph', {
        //information graph
        title: {text: "Nombre d'offres d'emploi sur le métier de " + job_name},
        subtitle: {text: 'Source: pole emploi'},
        // config graph
        xAxis: {type: 'datetime', dateTimeLabelFormats: {month: '%e. %b', year: '%b            '}},
        yAxis: {title:{text: "Nombre de propositions d'emploi"}},
        plotOptions: {series: {label: {connectorAllowed: false}, pointStart: date_begin}},
        //data and data name
        series: [{
            name: "Nombre d'offres d'emplois",
            data: list_of_job
        }]
    });
}

function get_time(str) {
    var i = 0;
    var year = 0;
    var month = 0;
    var day = 0;
    var tmp = "";
    
    for (i; str[i] != '-'; i += 1)
    {
        tmp += str[i];
    }
    year = parseInt(tmp, 10);
    tmp = "";
    i += 1;
    for (i; str[i] != '-'; i += 1)
    {
        tmp += str[i];
    }
    month = parseInt(tmp, 10);
    month -= 1;
    if (month === 0)
        month = 11;
    tmp = "";
    i += 1;
    for (i; str[i]; i += 1)
    {
        tmp += str[i];
    }
    day = parseInt(tmp, 10);
    return (Date.UTC(year, month, day));
}

function get_double_tab(tab, answer)
{
    var j = 0;
    var i = 0;
    var tmp = [];
    var tmp_str = "";
    var nb = 0;
    
    while (answer[i])
    {
       for (j = 0; answer[i][j] != ' '; j += 1)
       {
           tmp_str += answer[i][j];
       }
       tmp.push([get_time(tmp_str), tab[i]]);
       tmp_str = "";
       i += 1;
    }
    return (tmp);
}

function get_data(obj_json, job_name)
{
    var url = "http://bbsn-server.eu/server/request.php";
    var request = new XMLHttpRequest();
    var tmp;
    var i = 0;
    request.open("POST", url, true);
    request.setRequestHeader('Authorization', 'Basic ' + token);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            tmp = JSON.parse(request.response);
            list_of_job = [];
            while (tmp.visualization[i])
            {
                list_of_job.push(get_nbr(tmp.visualization[i]));
                i += 1;
            }
            display_prediction(tmp.previsualization);
            list_of_job = get_double_tab(list_of_job, tmp.visualization);
            date_begin = 2010;
            graphical(list_of_job, date_begin, job, job_name);
        }
    }
    request.send(obj_json);
}

function get_nbr(str)
{
    var nb = 0;
    var i = 0;
    var tmp = "";
    
    for (i; str[i] != '/'; i += 1);
    i += 1;
    while (str[i])
    {
        tmp += str[i];
        i += 1;
    }
    nb = parseInt(tmp, 10);
    return (nb);
}

function parse_job(str)
{
    var i = 0;
    var tmp = "";
    
    while (str[i] != '(')
    {i += 1;}
    i += 1;
    while (str[i] != ')')
    {
        tmp += str[i];
        i += 1;
    }
    return (tmp);
}

function parse_job_name(str)
{
    var i = 0;
    var name = "";
    
    for (i = 0; str[i] != '('; i += 1)
        name += str[i];
    return (name);
}

function display_prediction(str)
{
    if (predict_error == "")
        return;
    var nb = parseInt(str, 10);
    var date = "";
    for (let i = 0; date_to_find[i] != ' '; i += 1)
        date += date_to_find[i];
    document.getElementsByClassName("box_prediction")[0].style.display = "";
    console.log(document.getElementsByClassName("box_prediction")[0].style);
    document.getElementById("prediction").innerHTML = "Estimation pour le "+ date +": <br><span  id=\"nbr\">" + nb + "</span>";
}

//take all information to do the request and get the number of jobs
function parse_research()
{
    var country = document.getElementById("pays").value;
    job = document.getElementById("job").value;
    job_name = document.getElementById("job").value;
    date_begin = document.getElementById("date").value;
    date_to_find = document.getElementById("date_predicted").value;
    predict_error = date_to_find;
    if (country == "" || job == "" || date_begin == "")
    {
        alert("Mauvais paramètres");
        return (null);
    }
    document.getElementById("prediction").innerHTML = "";
    document.getElementsByClassName("box_prediction")[0].style.display = "none";
    job = parse_job(job);
    job_name = parse_job_name(job_name);
    date_begin += " 00:00:00+02";
    date_to_find += " 00:00:00+02";
    var str_to_json = '{"country":"'+ country +'", "job":"' + job + '", "date":"'+ date_begin +'", "date_predicted":"'+ date_to_find+'"}';
    get_data(str_to_json, job_name);
}