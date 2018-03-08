/*
© Copyright IBM Corp. 2017
*/


'use strict';

// The expertise handler
const {handler} = require('skill-sdk-nodejs');

// Expertise translations map
const languageResource = {
    'en-US': {
        'translation': {
            'HELLO_WORLD': 'Hello world',
            'TRY_AGAIN': 'Sorry, please try again later'
        }
    },
    'de-DE': {
        'translation': {
            'HELLO_WORLD': 'Hallo Welt',
            'TRY_AGAIN': 'Sorry, bitte versuchen Sie es später noch einmal'
        }
    }
};

/**
 *  example callback function sent to the handler.converse function, change this function to suit your needs
 * @param result - request result from WCS
 * @param response - the response variable
 * @param context - variable holding the utterance, session and updated skill context
 * @param err - error description in case of an error, otherwise undefined
 */
let converseCallback = function (result, response, context, err) {
    // this variable would preferably come from your wcs and decide whether the session has ended
    let deleteSkillSession = false;
    if (err) {
        response.say(handler.t('TRY_AGAIN')).send();
        console.error(err);
    }
    else {
        // example of adding a card
        // example of a card sent to the application, the action and the json most of the time will come from WCS
        response.card('some action', {"some": "json"});
        response.say(result.output.text).deleteSkillSession(deleteSkillSession).send();
    }
};

// Actions for DEFAULT state
const stateDefaultActions = handler.createActionsHandler({

    // this is an example of an intent using a regex engine, the intent catches the phrase "hello"
    'first': (request, response, context) => {
        response.say(handler.t("I understand you eat the fish. But when you clean the fish you can't leave the fish head and guts and shit in the sink. Because the whole house smells like a bait station. So you gotta put it in the trash and then take the trash out. Do you understand? ")).send();
    },
    //this is an example of an intent using wcs - in order for this to work you need your own wcs workspace and intents
    //and change the intents name with your own
    'second': (request, response, context) => {
        response.say(handler.t('Motherfuck!')).send();
    },
    'unhandled': (request, response, context) => {
        response.say(handler.t('TRY_AGAIN')).send();
    }

}, 'DEFAULT');

module.exports = () => {
    // Register language translations.
    handler.registerLanguages(languageResource);
    // Register state actions
    handler.registerActionsHandler(stateDefaultActions);
};
