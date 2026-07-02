type QueryResult<T> = {
  [K in keyof T]:
    | { data: Awaited<T[K]>; success: true; error: null }
    | { data: null; success: false; error: string };
};

async function query<T extends Promise<unknown>[]>(queries: [...T]) {
  const results = await Promise.allSettled(queries);

  return results.map(result => {
    return result.status === "rejected"
      ? { data: null, success: false, error: String(result.reason) }
      : { data: result.value, success: true, error: null };
  }) as QueryResult<T>;
}

export { query };
