import { mockFetch } from "@/app/(main)/example/parallelism-live-test/_utils/mock-fetch";
import { query } from "@/lib/query";
import { connection } from "next/server";

async function ParallelismLiveTestAllSettled() {
  // connection() opts this demo into request-time rendering so the timing reads below are
  // legitimate runtime IO — not the unstable-value prerender error Cache Components raises.
  await connection();
  const start = new Date().getTime();

  const results = await query([
    mockFetch("https://jsonplaceholder.typicode.com/posts").then(x => x.json()),
    mockFetch("https://jsonplaceholder.typicode.com/comments").then(x => x.json()),
    mockFetch("https://jsonplaceholder.typicode.com/users").then(x => x.json())
  ]);

  const end = new Date().getTime();

  // Render each component based on its status and value
  return (
    <div>
      <h2 className="font-bold underline">Promise.allSettled</h2>
      <p>{`Total execution time: ${end - start} ms`}</p>
      <div>
        {results.map((result, index) => {
          if (result.success) {
            // Render component with resolved value
            switch (index) {
              case 0:
                return <p key={index}>Posts delay: {result.data.delay} ms</p>;
              case 1:
                return <p key={index}>Comments delay: {result.data.delay} ms</p>;
              case 2:
                return <p key={index}>Users delay: {result.data.delay} ms</p>;
            }
          } else {
            // Render error message with rejection reason
            return <p key={index}>Error: {result.error}</p>;
          }
        })}
      </div>
    </div>
  );
}

export { ParallelismLiveTestAllSettled };
