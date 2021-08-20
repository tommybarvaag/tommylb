export // https://docs.github.com/en/rest/reference/repos#releases
const fetchLatestNonPrereleaseNextJsRelease = async () => {
  let page = 1;
  // Max per page is 100
  const perPage = 100;
  let releasesToRetrieve = true;
  let release = null;

  while (releasesToRetrieve) {
    const releaseResponse =
      (await fetch(
        `https://api.github.com/repos/vercel/next.js/releases?per_page=${perPage}&page=${page}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            Authorization: `Basic ${Buffer.from(
              process.env.GITHUB_API_USERNAME + ":" + process.env.GITHUB_API_RELEASE_PAT
            ).toString("base64")}`,
            Accept: "application/vnd.github.v3+json"
          }
        }
      ).then(response => response.json())) ?? [];

    releasesToRetrieve =
      releaseResponse.length > 0 && releaseResponse.every(release => release.prerelease);
    page++;

    if (!releasesToRetrieve) {
      release = releaseResponse
        .filter(release => !release.prerelease)
        .reduce((a, b) => (a.published_at > b.published_at ? a : b), {});
    }
  }

  return release;
};
