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

    $("#todayandtemp").click(function () {
        $("#lineandupcoming").toggle();
    })

    var weatherIcons = {
        "Thunderstorm": '<i class="small-icon wi wi-storm-showers"></i>',
        "Clear": '<i class="small-icon wi wi-day-sunny"></i>',
        "Clouds": '<i class="small-icon wi wi-cloud"></i>',
        "Drizzle": '<i class="small-icon wi wi-rain"></i>',
        "Rain": '<i class="small-icon wi wi-rain"></i>',
        "Snow": '<i class="small-icon wi wi-snow"></i>',
        "Atmosphere": '<i class="small-icon wi wi-dog"></i>',
    }
    //console.log(data.city.name);
    var list = data.list;

    var hourly3 = getThreeHours(list);
    var five_day = getFiveDays(list);
    console.log(hourly3);
    //console.log(five_day);

    var five_day_objects = makeWeatherObjects(five_day);
    console.log(five_day_objects);


    function getThreeHours(array) {
        newArr = array.filter((date) => {
            let timeW = moment(date.dt_txt);
            //console.log(timeW.format("dddd"));
            //console.log(moment().format("dddd"))
            return timeW.format("dddd") == moment().format("dddd");
        })
        return newArr;
    }

    function getFiveDays(array) {
        newArr = array.filter((value) => {
            let timeW = moment(value.dt_txt);
            //console.log( timeW.format("ddd, MMM Do, hh:mm a"));
            //console.log(moment().format("hh"));

            return timeW.format("HH") == "12";
        })
        newArr.shift();
        return newArr;
    }

    function makeWeatherObjects(arr) {
        newArr = arr.map((data) => {
            return new Weather(data);
        })

        return newArr;
    }

    function Weather(data) {
        this.time = data.dt_txt;
        this.temp = data.main.temp;
        this.lo = data.main.temp_min;
        this.hi = data.main.temp_max;
        this.weather = data.weather[0].main;
        this.icon = weatherIcons[this.weather];
        //this.weather = weatherIcons['data.weather[0].main']
    }










}