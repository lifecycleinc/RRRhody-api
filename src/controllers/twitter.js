import cache from 'memory-cache';
import getTweets from '../utilities/twitter';

export default function (req, res, next) {
  let tweets = cache.get('tweets');

  if (tweets != null) {
    return res.json(tweets);
  }

  return getTweets()
  .then((tweets) => {
    cache.put('tweets', tweets, 1000 * 60 * 60 * 2);
    res.json(tweets);
  })
  .catch(next);
}
