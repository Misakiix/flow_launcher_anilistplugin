import anilist from "anilist-node"
import { Flow } from 'flow-launcher-helper';

const Anilist = new anilist();
const { on, showResult, run } = new Flow();

on('query', (params) => {

    if(params.length <= 1) {
        return showResult({
            title: "Aguardando pela query..."
        })
    }

    try {
        Anilist.searchEntry.anime(params).then(data => {
            const media = data.media

            media.map((anime, i) => {
                showResult({
                    title: anime.title.romaji,
                    method: 'open_result',
                    params: [`https://anilist.co/anime/${anime.id}/`],
                    iconPath: 'app.png',
                  });
            })
        
        })
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

  on('open_result', () => {
    const url = params;
    open(url);
  });
  
  run();


