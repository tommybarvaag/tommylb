import { getTweet } from "react-tweet/api";

async function getTweets(tweetIds: string[]) {
  if (!tweetIds.length) return [];

  const tweets = await Promise.all(tweetIds.map(id => getTweet(id)));
  return tweets;
}

export { getTweets };
