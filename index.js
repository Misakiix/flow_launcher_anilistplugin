import anilist from "anilist-node"
import { Flow } from 'flow-launcher-helper';
import open from 'open';

const Anilist = new anilist();
const { on, showResult, run } = new Flow();

on('query', async (params) => {

  try {
    const { media } = await Anilist.searchEntry.anime(`${params}`);

    const results = media.map(({ id, title: { romaji } }) => ({
      title: romaji,
      subtitle: "anime",
      method: 'open_result',
      params: [`https://anilist.co/anime/${id}/`],
      iconPath: './app.png',
    }));

    return showResult(...results);
  }
  catch (err) {
    if (err instanceof Error) {
      return showResult({
        title: 'Error',
        subtitle: err.message,
      });
    }
  }
});

on('open_result', (params) => {
  open(`${params}`);
});

run();