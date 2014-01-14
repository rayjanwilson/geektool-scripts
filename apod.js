#!/usr/local/bin/node

var jsdom = require('jsdom');
var request = require('request');
var fs = require('fs');

var today = new Date();
today = today.toJSON().substring(0, 10);

var downloadDir = '/Users/rmwilson/Pictures/apod/';
var downloadFile = today + '.jpg';

fs.readdir(downloadDir, function(err, files) {
    if (!(downloadFile in files)) {
        fetchImage();
    }

});

var fetchImage = function() {
    var apodUri = 'http://apod.nasa.gov/apod/';
    request({
        uri: apodUri
    }, function(error, response, body) {
        if (error && response.statusCode !== 200) {
            console.log('Error when contacting apod.nasa.gov/apod/');
        }

        jsdom.env({
            html: body,
            scripts: ["http://code.jquery.com/jquery-2.0.3.min.js"],
            done: function(err, window) {
                var $ = window.$;

                // jQuery is now loaded on the jsdom window created from 'agent.body'
                var image = $('html body center p a img').attr("src");
                var imageUri = apodUri + image;
                var downloadUri = downloadDir + downloadFile;
                request(imageUri).pipe(fs.createWriteStream(downloadUri));
            }

        });
    });

};