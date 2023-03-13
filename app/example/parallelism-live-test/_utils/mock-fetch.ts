const mockFetch = (
  url: string,
  delay: number = 1000
): Promise<{
  json: () => { url: string; delay: number };
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes("error")) {
        reject(new Error("Error"));
      } else {
        resolve({
          json: () => {
            return {
              url,
              delay
            };
          }
        });
      }
    }, delay);
  });
};

export { mockFetch };
