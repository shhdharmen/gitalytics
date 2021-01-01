import * as Twitter from 'twitter';

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

client.stream('statuses/filter', { track: '#2020Coded,#2020coded' }, (stream) => {
  stream.on('data', (tweet) => {
    client.post('statuses/retweet/' + tweet.id_str, function (rtError, rtweet) {
      if (rtError) {
        console.error(rtError);
        return;
      }
      console.log('retweeting at ' + Date.now());
    });
    client.post('favorites/create', { id: tweet.id_str }, function (likedError, rtweet) {
      if (likedError) {
        console.error(likedError);
        return;
      }
      console.log('liked at ' + Date.now());
    });
  });
  stream.on('error', (error) => {
    console.log(error);
  });
});
