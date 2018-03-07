# Alexa Magic Mirror

This is a web app that responds to calls made to the corresponding Alexa app. It is meant to be run on a raspberry pi using the chromium browser in fullscreen. We glued a monitor display behind a mirror.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

The things you need to install
**For a Real Mirror**
- You will need a raspberry pi with chromium
- python installed on that pi

**For in-browser testing**
- any browser
- python

### Installing

Clone or download the repository

```bash
git clone https://github.com/williamsu96/ie3alexateam2017.git
```

cd into that directory

```bash
cd ie3alexateam2017/
```

Go to line 393 and comment out `getFlags()`

```javascript
//line 393 //getFlags()
```

Run a python server on port 8000

```bash
python -m SimpleHTTPServer 8000
```



You should authorize the app to view your google calendar.

Click the time in order to change what the app displays.

## Built With

- Amazon Lambda
- Flask
- HTML, CSS, JQuery, and Javascript

## Authors

- **Harrison Pearl**
- **Bryan Li** 
- **Durell Gill** 
- **William Su**
