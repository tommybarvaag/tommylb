import {
  Tweet,
  TweetAuthor,
  TwitterApiResponseData,
  TwitterApiResponseRoot,
  TwitterApiResponseTweet
} from "@/types";

async function getTweets(ids: string[]) {
  const response = await fetch(
    `https://api.twitter.com/2/tweets?ids=${ids.join(
      ","
    )}&tweet.fields=attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text&expansions=author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id&user.fields=created_at,id,name,profile_image_url,protected,url,username,verified&media.fields=duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
      }
    }
  );

  const rawTweets = (await response.json()) as TwitterApiResponseRoot;

  const createTweet = (tweet: TwitterApiResponseData): Tweet => {
    const getAuthorInfo = (author_id: TwitterApiResponseData["author_id"]): TweetAuthor => {
      const author = rawTweets.includes.users.find(user => user.id === author_id);

      if (!author) {
        return undefined;
      }

      return {
        name: author.name,
        createdAt: author.created_at,
        id: author.id,
        protected: author.protected,
        url: author.url,
        verified: author.verified,
        username: author.username,
        profileImageUrl: author.profile_image_url,
        twitterUrl: `https://twitter.com/${author.username}`
      };
    };

    const replyToUser = getAuthorInfo(tweet.in_reply_to_user_id);

    const getRootTweet = (
      tweet: TwitterApiResponseData | (TwitterApiResponseTweet & { in_reply_to_user_id?: string })
    ) => ({
      id: tweet.id,
      text: (() => {
        // tweet text can start with a twitter user mention if the tweet is a reply
        // we want to remove that mention from the text.
        // We also want to remove any links from the text
        if (replyToUser) {
          return tweet.text
            .replace(`@${replyToUser.username} `, "")
            .replace(/https:\/\/[\n\S]+/g, "")
            .replace("&amp;", "&");
        }

        return tweet.text.replace(/https:\/\/[\n\S]+/g, "").replace("&amp;", "&");
      })(),
      authorId: tweet.author_id,
      editHistoryTweetIds: tweet.edit_history_tweet_ids,
      createdAt: tweet.created_at,
      inReplyToUserId: tweet.in_reply_to_user_id,
      inReplyToUser: replyToUser,
      publicMetrics: {
        retweetCount: tweet.public_metrics.retweet_count,
        replyCount: tweet.public_metrics.reply_count,
        likeCount: tweet.public_metrics.like_count,
        quoteCount: tweet.public_metrics.quote_count,
        impressionCount: tweet.public_metrics.impression_count
      },
      attachments: {
        mediaKeys: tweet.attachments.media_keys
      }
    });

    const getReferencedTweets = (mainTweet: TwitterApiResponseData) => {
      return (
        mainTweet?.referenced_tweets?.map(referencedTweet => {
          const fullReferencedTweet = rawTweets.includes.tweets.find(
            tweet => tweet.id === referencedTweet.id
          );

          return {
            type: referencedTweet.type,
            author: getAuthorInfo(fullReferencedTweet.author_id),
            ...getRootTweet(fullReferencedTweet)
          };
        }) || []
      );
    };

    const author = getAuthorInfo(tweet.author_id);

    return {
      ...getRootTweet(tweet),
      media:
        tweet?.attachments?.media_keys.map(key => {
          const media = rawTweets.includes.media.find(media => media.media_key === key);

          return {
            type: media.type,
            height: media.height,
            width: media.width,
            url: media.url,
            mediaKey: media.media_key
          };
        }) ?? [],
      referencedTweets: getReferencedTweets(tweet),
      author,
      likeUrl: `https://twitter.com/intent/like?tweet_id=${tweet.id}`,
      retweetUrl: `https://twitter.com/intent/retweet?tweet_id=${tweet.id}`,
      replyUrl: `https://twitter.com/intent/tweet?in_reply_to=${tweet.id}`,
      quoteUrl: `https://twitter.com/intent/tweet?text=%22${encodeURIComponent(
        tweet.text
      )}%22&in_reply_to=${tweet.id}`,
      url: `https://twitter.com/${author.username}/status/${tweet.id}`
    };
  };

  const tweets =
    (rawTweets?.data ?? []).reduce((allTweets, tweet) => {
      return [createTweet(tweet), ...allTweets];
    }, [] as Tweet[]) ?? ([] as Tweet[]);

  return tweets;
}

export { getTweets };
