var express = require('express')
var app = express()
var Bot = require("./bot"),
    config = require("./config");

var bot = new Bot(config);
var params = {
    q: "node.js",
    since: datestring(),
    result_type: "mixed"
};
console.log('RTD2: Running.');

//get date string for today's date (e.g. 2011-01-01)
function datestring() {
    var d = new Date(Date.now() - 5 * 60 * 60 * 1000); //est timezone
    return d.getUTCFullYear() + "-" +
        (d.getUTCMonth() + 1) + "-" +
        d.getDate();
};

function handleError(err) {
    console.log(err);
    console.error("response status:", err.statusCode);
    console.error("data:", err.data);
}


app.get('/', function(req, res) {

    res.write('<html><head>');
    res.write('<body>');
    res.write("hello");
    res.write("<ol>");
    var i = 0;

    setInterval(function() {
        var rand = Math.random();
        if (rand <= .55) { // retweet
        	console.log(params);
            bot.retweet(params, function(err, reply) {
                if (err) return handleError(err);
                //     res.write("<li>" + i+++"</li>");

                res.write("<li>" + "\nRetweet: retweeted response: " + reply.id + "</li>");
            });
        } else if (rand <= .95) { // favorite
        	console.log(params);
            bot.favorite(params, function(err, reply) {
                if (err) return handleError(err);
                res.write("<li>" + "\nFavorite: favorited response: " + reply.id + "</li>");
            });
        }
    }, 4000);
})

var server = app.listen(3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})
