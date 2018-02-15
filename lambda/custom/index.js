'use strict';
var Alexa = require("alexa-sdk");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello');
    },
    'GetTableOfIntent': function () {
        this.emit('SayTable');
    },
    'SayHello': function () {
        this.emit(':tell', "You can use number by asking get table for two");

        this.emit(':responseReady');
    },
    'SayTable': function () {
        var name = this.event.request.intent.slots.table_of.value;
        var number = parseInt(name);
        var table = "";
        for (var i = 1; i < 11; i++) {
          table = table + number + "<break time='0.1s' />" + i.toString() + " jaa " + (number * i);
          table = table + "<break time='0.3s' />";
        }

        this.response.speak("You requested table for"  + name + "<break time='0.3s' />" + "here is the table for" + name + "<break time='0.3s' />" + table)
            .cardRenderer('hello world', 'You requested table ' + table);
        this.emit(':responseReady');

    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};
