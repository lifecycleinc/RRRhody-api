import Twitter from 'twitter';
import Promise from 'bluebird';
import _ from 'lodash';

const {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_SECRET,
  CONSUMER_KEY,
  CONSUMER_SECRET
} = process.env;

if (!_.some([
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_SECRET,
  CONSUMER_KEY,
  CONSUMER_SECRET
], undefined)) {
  throw new Error('Twitter consumer and access token variables are required');
}

var client = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET
});

export default function() {
  const params = {
    screen_name: 'rrrhody',
    exclude_replies: true,
    count: 200
  };

  const url = 'statuses/user_timeline';

  return new Promise(function(resolve, reject) {
    client.get(url, params, function(error, tweets) {
      if (error) {
        reject(error);
      }

      resolve(tweets.filter(function(tweet) {
        return typeof tweet.entities != 'undefined' &&
          typeof tweet.entities.media != 'undefined' &&
          typeof tweet.entities.media[0].media_url != 'undefined';
      }).map(function(tweet) {
        return {
          text: tweet.text,
          url: tweet.entities.media[0].url,
          media_url: tweet.entities.media[0].media_url_https
        };
      }));
    });
  });
};
