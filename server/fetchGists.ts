import fetch from 'node-fetch';

const TAG = '[jsiw]';

export async function fetchGists() {
  const response = await fetch(process.env.GISTS_URL!);
  const gists = await response.json();

  const fileURLs = gists.reduce(
    (list, gist) => {
      const file = Object.values(gist.files).find(({ filename }) => filename.includes(TAG));

      if (file) {
        return [...list, (file as any).raw_url];
      }

      return list;
    },
    [],
  );

  return await Promise.all(
    fileURLs.map(
      async (url) => {
        const response = await fetch(url);
        return await response.text();
      },
    ),
  );
}
