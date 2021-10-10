import { Game } from '../backend/model';
import { SUPPORTED_GAMES } from '../constants';

async function run() {
  await Game.findOrCreate({
    where: {
      internal_id: SUPPORTED_GAMES.CODMW_2019,
    },
    defaults: {
      name: 'Call of Duty: Modern Warfare',
      developer: 'Infinity Ward',
      release_year: 2019,
      banner_image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Call_of_Duty_Modern_Warfare_Gamescom_2019_%2848605842367%29.jpg/800px-Call_of_Duty_Modern_Warfare_Gamescom_2019_%2848605842367%29.jpg',
      banner_image_license: 'CC BY 2.0',
      internal_id: SUPPORTED_GAMES.CODMW_2019,
    },
  });

  await Game.findOrCreate({
    where: {
      internal_id: SUPPORTED_GAMES.FORTNITE,
    },
    defaults: {
      name: 'Fortnite',
      developer: 'Epic Games',
      release_year: 2017,
      banner_image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Fortnite_at_E3_2018_side_front_1.jpg/640px-Fortnite_at_E3_2018_side_front_1.jpg',
      banner_image_license: 'CC BY-SA 2.0',
      internal_id: SUPPORTED_GAMES.FORTNITE,
    },
  });

  await Game.findOrCreate({
    where: {
      internal_id: SUPPORTED_GAMES.APEX_LEGENDS,
    },
    defaults: {
      name: 'Apex Legends',
      developer: 'Respawn Entertainment',
      release_year: 2019,
      banner_image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Apex_Legends_gaming_Gamescom_2019_%2848605673176%29.jpg/800px-Apex_Legends_gaming_Gamescom_2019_%2848605673176%29.jpg',
      banner_image_license: 'CC BY 2.0',
      internal_id: SUPPORTED_GAMES.APEX_LEGENDS,
    },
  });

  await Game.findOrCreate({
    where: {
      internal_id: SUPPORTED_GAMES.DOTA2,
    },
    defaults: {
      name: 'Dota 2',
      developer: 'Valve',
      release_year: 2013,
      banner_image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Dota_2_vanguard_prop.jpg/800px-Dota_2_vanguard_prop.jpg',
      banner_image_license: 'CC BY-SA 2.0',
      internal_id: SUPPORTED_GAMES.DOTA2,
    },
  });
}

run()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
