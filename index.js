//
// RTD2 - Twitter bot that tweets about the most popular github.com news
// Also makes new friends and prunes its followings.
//
var Bot = require("./bot"),
    config = require("./config");

var bot = new Bot(config);
var params = {
    q: "big data",
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

setInterval(function() {
    bot.twit.get("followers/ids", function(err, reply) {
        if (err) return handleError(err)
        console.log("\n# followers:" + reply.ids.length.toString());
    });
    var rand = Math.random();

    if (rand <= 0.55) { //  make a friend
        bot.mingle(function(err, reply) {
            if (err) return handleError(err);

            var name = reply.screen_name;
            console.log("\nMingle: followed @" + name);
        });
    } else if (rand <= .85) { // do a targeted follow


        bot.searchFollow(params, function(err, reply) {
            if (err) return handleError(err);

            var name = reply.screen_name;
            console.log("\nSearchFollow: followed @" + name);
        });
    } else if (rand <= .90) { // retweet


        bot.retweet(params, function(err, reply) {
            if (err) return handleError(err);

            console.log("\nRetweet: retweeted response: " + reply.id);
        });
    } else if (rand <= .95) { // favorite


        bot.favorite(params, function(err, reply) {
            if (err) return handleError(err);

            console.log("\nFavorite: favorited response: " + reply.id);
        });
    } else { //  prune a friend
        bot.prune(function(err, reply) {
            if (err) return handleError(err);

            var name = reply.screen_name
            console.log("\nPrune: unfollowed @" + name);
        });
    }
}, 4000);

function handleError(err) {
    console.error("response status:", err.statusCode);
    console.error("data:", err.data);
}