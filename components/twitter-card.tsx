import { Tweet } from "@/types";
import { getFormattedTwitterDate } from "@/utils/date-utils";
import Image from "next/image";
import Link from "./link";

const TwitterCard = ({ tweet }: { tweet: Tweet }) => {
  if (!tweet) {
    return null;
  }

  const createdAt = new Date(tweet.createdAt);

  return (
    <div className="my-6 flex items-center justify-center">
      <div className="max-w-xl rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Image
              height={44}
              width={44}
              alt="Twitter avatar"
              className="h-11 w-11 rounded-full"
              src={tweet.author.profileImageUrl}
            />
            <div className="ml-1.5 text-sm leading-tight">
              <span className="block font-bold">{tweet.author.name}</span>
              <span className="block font-normal">
                <Link href={tweet.author.twitterUrl}>@{tweet.author.username}</Link>
              </span>
            </div>
          </div>
          <svg className="inline-block h-6 w-auto fill-current text-blue-400" viewBox="0 0 24 24">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        {/* If tweet has in reply to user, show username here */}
        {tweet.inReplyToUser && (
          <div className="mt-2 flex items-center text-zinc-400">
            <p className="ml-1 text-sm ">
              In reply to{" "}
              <Link href={tweet.inReplyToUser.twitterUrl}>@{tweet.inReplyToUser.username}</Link>
            </p>
          </div>
        )}
        <p className="mt-3 whitespace-pre-wrap leading-normal">{tweet.text}</p>
        {tweet.media && tweet.media.length ? (
          <div
            className={
              tweet.media.length === 1
                ? "my-2 inline-grid grid-cols-1 gap-2"
                : "my-2 inline-grid grid-cols-2 gap-2"
            }
          >
            {tweet.media.map(m => (
              <Image
                key={m.mediaKey}
                alt={tweet.text}
                height={m.height}
                width={m.width}
                src={m.url}
                className="rounded-lg"
              />
            ))}
          </div>
        ) : null}
        <p className="my-0.5 py-1 text-sm text-zinc-400">
          {getFormattedTwitterDate(createdAt)} ·{" "}
          {tweet.publicMetrics.impressionCount > 0
            ? `${tweet.publicMetrics.impressionCount} views`
            : ""}
        </p>
        <div className="my-1 border border-b-0 border-zinc-700"></div>
        <div className="mt-3 flex">
          <div className="mr-6 flex items-center text-sm text-zinc-500">
            <Link href={tweet.likeUrl} underline={false} showExternalLinkIcon={false}>
              <svg className="h-5 w-auto fill-current" viewBox="0 0 24 24">
                <g>
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
              <span className="ml-3">{tweet.publicMetrics.likeCount}</span>
            </Link>
          </div>
          <div className="mr-6 flex items-center text-sm text-zinc-500">
            <Link href={tweet.replyUrl} underline={false} showExternalLinkIcon={false}>
              <svg className="h-5 w-auto fill-current" viewBox="0 0 24 24">
                <g>
                  <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                </g>
              </svg>
              <span className="ml-3">{tweet.publicMetrics.replyCount}</span>
            </Link>
          </div>
          <div className="mr-6 flex items-center text-sm text-zinc-500">
            <Link href={tweet.retweetUrl} underline={false} showExternalLinkIcon={false}>
              <svg className="h-5 w-auto fill-current" viewBox="0 0 24 24">
                <g>
                  <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                </g>
              </svg>
              <span className="ml-3">{tweet.publicMetrics.retweetCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TwitterCard };
