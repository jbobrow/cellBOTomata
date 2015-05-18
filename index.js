var Twit 	= require('twit');
var async 	= require('async');

console.log("HELLO BOT WORLD!");

var t = new Twit({
  consumer_key:         : process.env.CELLBOTOMATA_TWIT_CONSUMER_KEY,
  consumer_secret:      : process.env.CELLBOTOMATA_TWIT_CONSUMER_SECRET,
  access_token          : process.env.CELLBOTOMATA_TWIT_ACCESS_TOKEN,
  access_token_secret   : process.env.CELLBOTOMATA_TWIT_ACCESS_TOKEN_SECRET
});

// for testing purpose
getDummyTweet = function(cb) {
  var botData = {
    tweet         : 'This is a test tweet, nothing more to see here. Thanks @cellBOTomata',
    tweetID       : '123456789',
    tweetUsername : 'cellBOTomata'
  };
  cb(null, botData);
}

// get a tweet
getPublicTweet = function(cb) {
  t.get('search/tweets', {q: '@cellBOTomata', count: 1, result_type: 'recent', lang: 'en'}, function(err, data, response) {
    if (!err) {
      var botData = {
        baseTweet       : data.statuses[0].text.toLowerCase(),
        tweetID         : data.statuses[0].id_str,
        tweetUsername   : data.statuses[0].user.screen_name
      };
      cb(null, botData);
    } else {
      console.log("There was an error getting a public Tweet. Abandoning EVERYTHING :(");
      cb(err, botData);
    }
  });
};

// post our tweet
postTweet = function(botData, cb) {
	t.post('statuses/update', {status: botData.tweetBlock}, function(err, data, response) {
  		cb(err, botData);
	});
}


// main run function
run = function() {
  async.waterfall([
    getDummyTweet, 
    // extractWordsFromTweet, 
    // readRuleset, 
    // generatePattern,
    // formatTweet,
    postTweet
  ],
  function(err, botData) {
    if (err) {
      consola.log('There was an error posting to Twitter: ', err);
    } else {
      console.log('Tweet successful!');
      console.log('Tweet: ', botData.tweetBlock);
    }
    console.log('Base tweet: ', botData.baseTweet);
  });
}

// set an interval with which this should run
// setInterval(function() {
//   try {
//     run();
//   }
//   catch (e) {
//     console.log(e);
//   }
// }, 2 * 60 * 1000);	// milliseconds