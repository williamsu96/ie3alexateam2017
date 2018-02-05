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
    }, 10);

    var date_display = $("#date").text(date.format("dddd, MMM Do"));
    //date_display();
    //setInterval(date_display, 50000);
    
    $("#todayandtemp").click(function () {
        $("#lineandupcoming").toggle();
        //$("#upcoming").append("<div></div>")
        
        // showHourly();
    })

    function displayToday(object) {
        let timeW = moment(object.time);
        object.lo < 10 ? object.lo = '0' + parseInt(object.lo) : object.lo = parseInt(object.lo)
        object.hi < 10 ? object.hi = '0' + parseInt(object.hi) : object.hi = parseInt(object.hi)
        $("#todayandtemp").append(`${object.icon} <span id="today-degree">${parseInt(object.temp)}°</span> <div id="lohi"> <span>lo: ${parseInt(object.lo)}° </span> <span>hi: ${parseInt(object.hi)}° </span></div>`)
    }

    function displayUpcomingDays(object) {
        let timeW = moment(object.time);
        object.lo < 10 ? object.lo = '0' + parseInt(object.lo) : object.lo = parseInt(object.lo)
        object.hi < 10 ? object.hi = '0' + parseInt(object.hi) : object.hi = parseInt(object.hi)
        console.log(object.lo);
        
        $("#upcoming").append(`<div>${timeW.format("dddd")} ${object.icon} ${(object.lo)}° ${(object.hi)}°</div>`)
    }

    function displayUpcomingTimes(object) {
        let timeW = moment(object.time);
        object.lo < 10 ? object.lo = '0' + parseInt(object.lo) : object.lo = parseInt(object.lo)
        object.hi < 10 ? object.hi = '0' + parseInt(object.hi) : object.hi = parseInt(object.hi)
        $("#upcoming").append(`<div>${timeW.format("hh:mm")} ${object.icon} ${parseInt(object.lo)}° ${parseInt(object.hi)}°</div>`)
    }








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
    //console.log(hourly3);
    //console.log(five_day);
    var hourly3_objects = makeWeatherObjects(hourly3);
    var five_day_objects = makeWeatherObjects(five_day);
    console.log(hourly3_objects);
    console.log(five_day_objects);

    displayToday(five_day_objects[0])

    function showDaily(){
        for (let i = 1; i < five_day_objects.length; i++) {
            displayUpcomingDays(five_day_objects[i]);
        }
    }


    function showHourly() {
        for (let i = 0; i < hourly3_objects.length; i++) {
            displayUpcomingTimes(hourly3_objects[i]);
        }
    }

    showDaily();
    



    function getThreeHours(array) {
        day = array.filter((date) => {
            let timeW = moment(date.dt_txt);
            //console.log(timeW.format("dddd"));
            //console.log(moment().format("dddd"))
            return timeW.format("dddd") == moment().format("dddd");
        })

        times = day.filter((time) => {
            let timeW = moment(time.dt_txt);
            //console.log(timeW.format("HH"));
            //console.log(moment().format("dddd"))
            return Number(timeW.format("HH")) > Number(moment().format("HH"));
        })
        //console.log(times);
        
        return times;
    }

    function getFiveDays(array) {
        newArr = array.filter((value) => {
            let timeW = moment(value.dt_txt);
            //console.log( timeW.format("ddd, MMM Do, hh:mm a"));
            //console.log(moment().format("hh"));

            return timeW.format("HH") == "12";
        })
        //newArr.shift();
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