import { mockFetch } from "@/app/(main)/example/parallelism-live-test/_utils/mock-fetch";
import { connection } from "next/server";

async function ParallelismLiveTestAsyncAwait() {
  // connection() opts this demo into request-time rendering so the timing reads below are
  // legitimate runtime IO — not the unstable-value prerender error Cache Components raises.
  await connection();
  const start = new Date().getTime();

  // Fetch data from three APIs using React Server Components
  const results = [
    await mockFetch("https://jsonplaceholder.typicode.com/posts").then(x => x.json()),
    await mockFetch("https://jsonplaceholder.typicode.com/comments").then(x => x.json()),
    await mockFetch("https://jsonplaceholder.typicode.com/users").then(x => x.json())
  ];

  const end = new Date().getTime();
  // Render each component based on its status and value
  return (
    <div>
      <h2 className="font-bold underline">Async await</h2>
      <p>{`Total execution time: ${end - start} ms`}</p>
      <div>
        {results.map((result, index) => {
          switch (index) {
            case 0:
              return <p key={index}>Posts delay: {result.delay} ms</p>;
            case 1:
              return <p key={index}>Comments delay: {result.delay} ms</p>;
            case 2:
              return <p key={index}>Users delay: {result.delay} ms</p>;
          }
        })}
      </div>
    </div>
  );
}

export { ParallelismLiveTestAsyncAwait };
