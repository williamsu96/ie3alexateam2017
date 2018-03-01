//openweather key: 898b69392d37088b5c01a7c774335e37


var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=Chicago&id=60201&units=imperial&APPID=";
var apiKey = "898b69392d37088b5c01a7c774335e37";

var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=Chicago&id=60201&units=imperial&APPID=";
var url1 = forecastURL + apiKey;

var myList;
var url2 = weatherURL + apiKey;

var weatherServer = "https://alexa-magic-mirror.herokuapp.com/display/current";
var forecastServer = "https://alexa-magic-mirror.herokuapp.com/display/forecast";
var flagsServer = "https://alexa-magic-mirror.herokuapp.com/display/getflag";
//flags: "current" / "forecast"/ "hide" / "calendar";


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
    //gets the weather for right now
    fetch(weatherServer, {
        method: 'GET'
    })
        .then(r => r.json())
        .then(data => {
            console.log(data)
        })
        .catch((err) => console.log(err))

        //Gets the flag
    fetch(flagsServer, {
        method: 'GET'
    })
        .then(r => r.json())
        .then(data => {
            console.log(data)
        })
        .catch((err) => console.log(err))
        

    //gets the forecast
    fetch(forecastServer, {
        method: 'GET'
    })
        .then(r => r.json())
        .then(data => {
            console.log(data)
        })
        .catch((err) => console.log(err))


        /*
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
            
        })*/

    

    /*
    fetch(url1)
        .then((data) => data.json())
        .then((prom) => {
            myList = prom.list;
            //console.log(myList);
        })
        .then(() => doStuff(myList))
        .catch((err) =>
            console.log(err)
        );*/

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

        function showCalendar() {
            for (let i = 0; i < myEvents.length; i++) {
                displayCalendar(myEvents[i]);
            }
        }

        function displayCalendar(calEvent) {
            //var when = event.start.dateTime;
            var when = moment(calEvent.start.dateTime).format("hh:mm a");
            var summary = calEvent.summary;
            $('#Calendar').append(`<div> ${when} ${summary} </div>`);
        }



        showDaily();
        showHourly();
        showCalendar();
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
            console.log(myEvents);

            toggle(state);
            state++;
            if (state >= 4) state = 0;
        });

    }



    function getFlags() {
        var state = 0;
        setInterval(function () {
            fetch()
                .then((prom) => prom.json())
                .then((data) => {
                    switch (data) {
                        case "hide":
                            state = 0;
                            break;
                        case "current":
                            state = 1;
                            break;
                        case "forecast":
                            state = 2;
                            break;
                        case "calendar":
                            state = 3;
                            break;
                        default:
                            state = 0;
                            break;
                    }
                    toggle(state);
                    if (state >= 4) state = 0;
                });
        }, 1000);
    }

    function toggle(state) {
        switch (state) {
            //displays nothin
            case 0:
                $('#futureDays').fadeOut(500);
                $('#futureTimes').fadeOut(500);
                $('#Calendar').fadeOut(500);
                break;
                //displays the 3hourly data
            case 1:
                $('#futureDays').hide();
                $('#Calendar').hide();
                $('#futureTimes').fadeIn(1000);
                break;
            case 2:
                //displays the forecast
                $('#futureDays').fadeIn(1000);
                $('#futureTimes').hide();
                $('#Calendar').hide();
                break;
            case 3:
                //displays the calendar
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

var CLIENT_ID = '123443630640-hod7nh8d4ra5vrv49nb1irodmi0d5ap8.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBorTMiHFRzdz6v8ekiVG02EVNzOAiA0gY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */


function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        $('#spooky').hide();
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}


/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */

var myEvents = [];

function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 5,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        console.log(events);



        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                console.log(event.summary)
                console.log(moment(when).format("hh:mm a"));
                myEvents.push(event)
            }
        } else {
            console.log('No upcoming events found.');
        }
    });
}