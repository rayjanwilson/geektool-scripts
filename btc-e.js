#!/usr/bin/env node

var jsdom = require('jsdom');
var request = require('request');
var now = new Date();

now = now.toJSON().split('T')[1].split('.')[0];

var getPrice = function(now) {

    request({
        uri: "http://bitcoinwisdom.com/markets/btce/btcusd"
    }, function(error, response, body) {
        if (error && response.statusCode !== 200) {
            console.log('Error when contacting bitcoinwisdom.com');
        }
        jsdom.env({
            html: body,
            scripts: ["http://code.jquery.com/jquery-2.0.3.min.js"],
            done: function(err, window) {
                var $ = window.$;

                $("span#market_btcebtcusd").each(function() {
                    console.log('$' + $(this).text() + '\t' + now );
                });
            }

        });
    });
};

getPrice(now);