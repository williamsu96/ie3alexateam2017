//openweather key: 898b69392d37088b5c01a7c774335e37

var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=Chicago&id=60201&units=imperial&APPID=";
var apiKey = "898b69392d37088b5c01a7c774335e37";

var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Chicago&id=60201&units=imperial&APPID=";
var url1 = forecastURL + apiKey;

var myList;
var url2 = weatherURL + apiKey;

var server1;
var server2;

window.onload = function () {

    function displayToday(object) {
        let timeW = moment(object.time);
        object.lo < 10 ? object.lo = '0' + parseInt(object.lo) : object.lo = parseInt(object.lo)
        object.hi < 10 ? object.hi = '0' + parseInt(object.hi) : object.hi = parseInt(object.hi)
        $("#todayandtemp").append(`${object.icon} <span id="today-degree">${parseInt(object.temp)}°</span> <div id="lohi"> <span>lo: ${parseInt(object.lo)}° </span> <span>hi: ${parseInt(object.hi)}° </span></div>`)
    }

    var weatherIcons = {
        "Thunderstorm": '<i class="small-icon wi wi-storm-showers"></i>',
        "Clear": '<i class="small-icon wi wi-day-sunny"></i>',
        "Clouds": '<i class="small-icon wi wi-cloud"></i>',
        "Drizzle": '<i class="small-icon wi wi-rain"></i>',
        "Rain": '<i class="small-icon wi wi-rain"></i>',
        "Snow": '<i class="small-icon wi wi-snow"></i>',
        "Atmosphere": '<i class="small-icon wi wi-dog"></i>',
        "Mist": '<i class="small-icon wi wi-day-cloudy"></i>',
        "Haze": '<i class="small-icon wi wi-fog"></i>'
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

    fetch(url2)
        .then((prom) => prom.json())
        .then((data) => {
            console.log(data);
            var today = {};
            today.time = data.dt;
            today.temp = data.main.temp;
            today.lo = data.main.temp_min;
            today.hi = data.main.temp_max;
            today.weather = data.weather[0].main;
            today.icon = weatherIcons[today.weather];
            displayToday(today);

        })
        .then(() => {

        })
        .catch((err) =>
            console.log(err)
        );

    fetch(url1)
        .then((data) => data.json())
        .then((prom) => {
            myList = prom.list;
            //console.log(myList);
        })
        .then(() => doStuff(myList))
        .catch((err) =>
            console.log(err)
        );

    function doStuff(apiData) {
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




        function displayUpcomingDays(object) {
            let timeW = moment(object.time);
            object.lo < 10 ? object.lo = '0' + parseInt(object.lo) : object.lo = parseInt(object.lo)
            object.hi < 10 ? object.hi = '0' + parseInt(object.hi) : object.hi = parseInt(object.hi)
            //console.log(object.lo);

            $("#futureDays").append(`<div "class='dayz'">${timeW.format("dddd")} ${object.icon} ${(object.lo)}° ${(object.hi)}°</div>`)
        }

        function displayUpcomingTimes(object) {
            let timeW = moment(object.time).subtract(6, 'hours');
            //console.log(timeW);
            object.lo < 10 ? object.lo = '0' + parseInt(object.lo) : object.lo = parseInt(object.lo)
            object.hi < 10 ? object.hi = '0' + parseInt(object.hi) : object.hi = parseInt(object.hi)
            $("#futureTimes").append(`<div "class='timez'">${timeW.format("hh:mm a")} ${object.icon} ${parseInt(object.lo)}° ${parseInt(object.hi)}°</div>`)
        }


        //console.log(data.city.name);
        var list = apiData;
        console.log(list)

        var hourly3 = getThreeHours(list);
        var five_day = getFiveDays(list);

        var hourly3_objects = makeWeatherObjects(hourly3);
        var five_day_objects = makeWeatherObjects(five_day);
        console.log(hourly3_objects);
        console.log(five_day_objects);

        //displayToday();

        function showDaily() {
            for (let i = 0; i < five_day_objects.length; i++) {
                displayUpcomingDays(five_day_objects[i]);
            }
        }


        function showHourly() {
            for (let i = 0; i < hourly3_objects.length; i++) {
                displayUpcomingTimes(hourly3_objects[i]);
            }
        }

        showDaily();
        showHourly();
        $('#futureDays').hide();
        $('#futureTimes').hide();
        $('#Calendar').hide();


        function getThreeHours(array) {
            var times = [];

            for (let i = 0; i < 5; i++) {
                times.push(Object.values(array)[i]);
            }
            return times;
        }

        function getFiveDays(array) {
            newArr = array.filter((value) => {
                let timeW = moment(value.dt_txt);
                //console.log( timeW.format("ddd, MMM Do, hh:mm a"));
                //console.log(moment().format("hh"));

                return timeW.format("HH") == "12";
            })
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
        var state = 1;
        $("#todayandtemp").click(function () {
            toggle(state);
            state++;
            if (state >= 4) state = 0;
        });

    }

    var state = 0;

    function myFunction() {
        setInterval(function () {
            fetch('http://numbersapi.com/random?min=0&max=4')
                .then((prom) => prom.json())
                .then((data) => {

                    toggle(state);
                    state++;
                    if (state >= 4) state = 0;
                });
        }, 1000);
    }

    function toggle(state) {
        switch (state) {
            case 0:
                $('#futureDays').fadeOut(500);
                $('#futureTimes').fadeOut(500);
                $('#Calendar').fadeOut(500);
                break;
            case 1:
                $('#futureDays').fadeIn(1000);
                $('#futureTimes').hide();
                $('#Calendar').hide();
                break;
            case 2:
                $('#futureDays').hide();
                $('#Calendar').hide();
                $('#futureTimes').fadeIn(1000);
                break;
            case 3:
                $('#futureDays').hide();
                $('#futureTimes').hide();
                $('#Calendar').fadeIn(1000);
                break;
            default:
                $('#futureDays').hide();
                $('#futureTimes').hide();
                $('#Calendar').hide();
                break;
        }

    }
}