//openweather key: 898b69392d37088b5c01a7c774335e37

var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?id=60201&APPID=";
var apiKey = "898b69392d37088b5c01a7c774335e37";

var url = weatherURL + apiKey;

window.onload = function () {
    
    var date = new moment();
    var dayInMilliseconds = 1000 * 60 * 60 * 12;

    var updateTime = setInterval(function () {  
       //var time_display = $("#time").text(time.format("hh:mm:ss a"));
       var time = new moment();
       var time_display = document.getElementById("time").innerHTML = time.format("hh:mm a");
    }, 500);

    var updateTime = setInterval(function () {  
        var date_display = $("#date").text(date.format("dddd, MMM Do"));
     }, dayInMilliseconds);

    $("#todayandtemp").click(function() {
        $("#lineandupcoming").toggle();
    })


}


/*
{dt: 1516579200,
    main: {
        temp: 266.6,
        temp_min: 266.254,
        temp_max: 266.6,
        pressure: 1003.19,
        sea_level: 1024.44,
        grnd_level: 1003.19,
        humidity: 92,
        temp_kf: 0.35
    },
    weather: [{
        id: 600,
        main: "Snow",
        description: "light snow",
        icon: "13n"
    }],
    clouds: {
        all: 88
    },
    wind: {
        speed: 2.72,
        deg: 300.503
    },
    snow: {
        3 h: 0.155
    },
    sys: {
        pod: "n"
    },
    dt_txt: "2018-01-22 00:00:00"
},
*/