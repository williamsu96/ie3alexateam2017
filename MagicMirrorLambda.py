from __future__ import print_function

from botocore.vendored import requests

import json

# --------------- Response Building ----------------------

def build_speechlet_response(title, output, reprompt_text, should_end_session):
    return {
        'outputSpeech': {
            'type': 'PlainText',
            'text': output
        },
        'card': {
            'type': 'Simple',
            'title': "SessionSpeechlet - " + title,
            'content': "SessionSpeechlet - " + output
        },
        'reprompt': {
            'outputSpeech': {
                'type': 'PlainText',
                'text': reprompt_text
            }
        },
        'shouldEndSession': should_end_session
    }


def build_response(session_attributes, speechlet_response):
    return {
        'version': '1.0',
        'sessionAttributes': session_attributes,
        'response': speechlet_response
    }


# --------------- Intent Functions ------------------

def get_welcome_response():
    session_attributes = {}
    card_title = "Welcome"
    speech_output = "Hello. Welcome to Magic Mirror."
    reprompt_text = "I can show your schedule or the weather, just ask"
    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))


def handle_session_end_request():
    card_title = "Session Ended"
    speech_output = "Goodbye "
    should_end_session = True
    return build_response({}, build_speechlet_response(
        card_title, speech_output, None, should_end_session))

        
def weatherToday(intent, session):
    resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/current/Chicago")
    respT = resp.json()
    if  respT['res'] == "already set":
        speech_output = "Todays weather is already being displayed"
        resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/current/Chicago")
    else:
        speech_output = "Here's today's weather"
        resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/current/Chicago")


    card_title = intent['name']
    session_attributes = {}
    should_end_session = False   
    reprompt_text = "How can I help"
    

    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def weatherWeek(intent, session):
    resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/forcast/Chicago")
    respT = resp.json()
    if  respT['res'] == "already set":
        speech_output = "this weeks forecast is already being displayed"
        resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/forcast/Chicago")
    else:
        speech_output = "Here's this weeks forecast"
        resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/forcast/Chicago")
    
    card_title = intent['name']
    session_attributes = {}
    should_end_session = False   
    reprompt_text = "How can I help"
    

    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def scheduleToday(intent, session):
    resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/schedule/string")
    respT = resp.json()
    if  respT['res'] == "already set":
        speech_output = "your schedule is already being displayed"
        resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/schedule/string")
    else:
        speech_output = "Here's your schedule for today"
        resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/schedule/string")

    card_title = intent['name']
    session_attributes = {}
    should_end_session = False   
    reprompt_text = "How can I help"
    

    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))
        
def hide(intent, session):
    resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/hide/string")
    respT = resp.json()
    if  respT['res'] == "already set":
        speech_output = "everything is already hidden"
        resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/hide/string")
    else:
        speech_output = " "
        resp = requests.get("https://alexa-magic-mirror.herokuapp.com/api/hide/string")

    card_title = intent['name']
    session_attributes = {}
    should_end_session = False   
    reprompt_text = "How can I help"
    

    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))


# --------------- Event Routing ------------------

def on_session_started(session_started_request, session):
    print("on_session_started requestId=" + session_started_request['requestId']
          + ", sessionId=" + session['sessionId'])


def on_launch(launch_request, session):
    print("on_launch requestId=" + launch_request['requestId'] +
          ", sessionId=" + session['sessionId'])
    return get_welcome_response()


def on_intent(intent_request, session):


    print("on_intent requestId=" + intent_request['requestId'] +
          ", sessionId=" + session['sessionId'])

    intent = intent_request['intent']
    intent_name = intent_request['intent']['name']



    if intent_name == "weatherToday":
        return weatherToday(intent, session)
    elif intent_name == "weatherWeek":
        return weatherWeek(intent, session)
    elif intent_name == "scheduleToday":
        return scheduleToday(intent, session)
    elif intent_name == "hide":
        return hide(intent, session)
    elif intent_name == "AMAZON.HelpIntent":
        return get_welcome_response()
    elif intent_name == "AMAZON.CancelIntent" or intent_name == "AMAZON.StopIntent":
        return handle_session_end_request()
    else:
        raise ValueError("Invalid intent")


def on_session_ended(session_ended_request, session):
    print("on_session_ended requestId=" + session_ended_request['requestId'] +
          ", sessionId=" + session['sessionId'])
 


# --------------- Main Routing ------------------

def lambda_handler(event, context):

    print("event.session.application.applicationId=" +
        event['session']['application']['applicationId'])


    if event['session']['new']:
        on_session_started({'requestId': event['request']['requestId']},
                           event['session'])

    if event['request']['type'] == "LaunchRequest":
        return on_launch(event['request'], event['session'])
    elif event['request']['type'] == "IntentRequest":
        return on_intent(event['request'], event['session'])
    elif event['request']['type'] == "SessionEndedRequest":
        return on_session_ended(event['request'], event['session'])
