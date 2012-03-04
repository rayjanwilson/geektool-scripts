#!/usr/local/bin/node

var jsdom = require('jsdom');
var request = require('request');

request({ uri:'http://weather.yahoo.com/united-states/alaska/99709-12799756/' }, function (error, response, body) {
  if (error && response.statusCode !== 200) {
    console.log('Error when contacting google.com');
  }

  jsdom.env({
    html: body,
    scripts: [
      './jquery-1.7.1.min.js'
    ]
  }, function (err, window) {
    var $ = window.jQuery;

    // jQuery is now loaded on the jsdom window created from 'agent.body'
    console.log($('#yw-cond').html());
    console.log($('#yw-temp').html() +'F');
    console.log($('.forecast-temp p').html());
  });
});
