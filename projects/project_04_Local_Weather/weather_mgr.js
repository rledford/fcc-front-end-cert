
/*

<div class="col-md-3 col-centered forecast-bg">
    <div class="forecast-text">
        <div class="row font-fc-date">Friday, 15th</div>
        <div class="row font-fc-desc">Cloudy</div>
    </div>
    <div class="wi wi-night-sleet weather-icon"></div>
    <div class="forecast-text" style="text-align: right">
        <div class="row-fluid font-fc-high">H 100°</div>
        <div class="row-fluid font-fc-low">L 80°</div>
    </div>
</div>

<div class="col-md-4 col-centered forecast-bg">
    <div class="forecast-text">
        <div class="row-fluid font-fc-date">Friday, 15th</div>
        <div class="row-fluid font-fc-desc">Scattered Thunderstorms</div>
    </div>
    <div class="wi wi-yahoo-39 weather-icon"></div>
    <div class="forecast-text" style="text-align: right">
        <div class="row-fluid font-fc-high">H 100°</div>
        <div class="row-fluid font-fc-low">L 80°</div>
    </div>
</div>

<div class="row row-centered animated zoomIn">
    <div class="col-md-8 col-md-offset-2 col-centered forecast-bg">
        <div class="forecast-text">
            <div class="row font-fc-date">Friday, 15th</div>
            <div class="row font-fc-desc">Scattered Thunderstorms</div>
        </div>
        <div class="wi wi-yahoo-39 weather-icon"></div>
        <div class="forecast-text" style="text-align: right">
            <div class="row font-fc-high">H 100°</div>
            <div class="row font-fc-low">L 80°</div>
        </div>
    </div>
</div>
<hr></hr>

"code": "26",
"date": "15 Jul 2016",
"day": "Fri",
"high": "53",
"low": "49",
"text": "Cloudy"

https://query.yahooapis.com/v1/public/yql?q=select%20woeid%20from%20geo.places%20where%20text%3D'iowa%2C%20la'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
*/

var htmlForecasts = [];

function shortFormText(str){
    var words = str.split(' ');
    var ret = []
    for (var i = 0; i < words.length; i++){
        var word = words[i];
        switch(word.toLowerCase()){
            case "isolated":
                word = "Iso";
                break;
            case "scattered":
                word = "Sct";
                break;
            case "thunderstorms":
                word = "Th-storms";
                break;
            case "thundershowers":
                word = "Th-showers";
                break;
            case "and":
                word = "|";
                break;
            case "freezing":
                word = "Frz";
                break;
        }
        ret.push(word);
    }
    return ret.join(" ");
}

function setStatusText(text){
    $("#status-text").html(text);
}

function showSearchStatus(){
    setStatusText("Searching... "+"<div class='fa fa-repeat fa-spin load-icon'</div>");
}

function buildHtmlForecast(forecast, index) {
    "use strict";
    var html = "";
    html += "<div id='forecast-"+index+"' class='row row-centered animated zoomIn'>";
        html += "<div class='col-md-8 col-md-offset-2 col-centered forecast-bg'>";
            html += "<div class='forecast-text'>";
                html += "<div class='row font-fc-date'>"+forecast.date+"</div>";
                html += "<div class='row font-fc-desc'>"+shortFormText(forecast.text)+"</div>";
            html += "</div>";
            html += "<div class='wi wi-yahoo-"+forecast.code+" weather-icon fa'></div>";
            html += "<div class='forecast-text'>"
                html += "<div class='row font-fc-high'>H "+forecast.high+"°</div>";
                html += "<div class='row font-fc-low'>L "+forecast.low+"°</div>";
            html += "</div>";
        html += "</div>";
    html += "</div>";
    html += "<hr></hr>";
    console.log(html);
    return html;
}

function processWeatherData(json) {
    "use strict";
    if(!json){
        console.log("the JSON object passed to processWeatherData is null");
        return;
    }
    //clear previous forecast data
    try{
        var forecasts = json.query.results.channel.item.forecast;
        htmlForecasts = [];
        $("#forecast-parent").html("");
        for (var i = 0; i < forecasts.length; i++){
            var fcHtml = buildHtmlForecast(forecasts[i], i);
            htmlForecasts.push(fcHtml);
            $("#forecast-parent").append(fcHtml);
        }
        setStatusText(json.query.results.channel.location.city+", "+json.query.results.channel.location.region);
    }
    catch(e){
        setStatusText("<div class='animated rubberBand'>Unable to find the requested location</div>");
    }
}

function getWebWeatherData(cityandstate){
    "use strict";
    if (cityandstate === ""){
        setStatusText("<div class='animated rubberBand'>Please, enter a search location!</div>");
        return;
    }
    var str = cityandstate.split(',');
    var city = "";
    var state = "";
    for (var i = 0; i < htmlForecasts.length; i++){
            //add exit animations
            $("#forecast-"+i).addClass("animated zoomOut");
        }
    showSearchStatus();
    if (str.length >= 1){
        city = str[0];
        if (str.length > 1){
            state = str[1].replace(/\s/g, '');
        }
    }
    var query = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
    query += city + "%2C%20"+ state + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    var request = new XMLHttpRequest();
    request.open("GET", query, true);
    request.onreadystatechange = function(){
        if (request.readyState === 4 && request.status === 200) {
            var json = JSON.parse(request.responseText);
            processWeatherData(json);
          }
        else{
            console.log(request.response);
        }
    };
    request.send();
}

function getWeatherData() {
    "use strict";
    console.log("getting weather data");
    var request = new XMLHttpRequest();
    request.open("GET", "yahoo_json_resp.json", true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status === 0) {
                var ywJson = JSON.parse(request.responseText);
                processWeatherData(ywJson);
            }
          }
        };
    request.send(null);
}
