import { Game } from '../backend/model';
import { SUPPORTED_GAMES } from '../constants';

async function run() {
  const [codmw2019] = await Game.findOrCreate({
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
      logo_image: null,
      logo_image_license: null,
      background_image: null,
      background_image_license: null,
    },
  });

  await codmw2019.update({
    banner_image: 'https://media.snl.no/media/148627/standard_cod.png',
    banner_image_license: 'CC BY NC SA 3.0',
    background_image:
      'https://www.hdwallpapers.net/previews/call-of-duty-ghost-masked-warrior-442.jpg',
    background_image_license: 'CC BY SA 3.0',
  });

  const [fortnite] = await Game.findOrCreate({
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
      logo_image: null,
      logo_image_license: null,
      background_image: null,
      background_image_license: null,
    },
  });

  await fortnite.update({
    banner_image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Fortnite_at_E3_2018_side_front_1.jpg/640px-Fortnite_at_E3_2018_side_front_1.jpg',
    banner_image_license: 'CC BY-SA 2.0',
    background_image:
      'https://www.trustedreviews.com/wp-content/uploads/sites/54/2021/08/Street-fighter-fornite-920x518.jpg',
    background_image_license: 'CC BY NC ND 4.0',
  });

  const [apexLegends] = await Game.findOrCreate({
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
      logo_image: null,
      logo_image_license: null,
      background_image: null,
      background_image_license: null,
    },
  });

  await apexLegends.update({
    banner_image:
      'https://live.staticflickr.com/65535/48584815291_83b31e3467_c_d.jpg',
    banner_image_license: 'CC BY 2.0',
    background_image: 'https://media.snl.no/media/69222/standard_apex2.png',
    background_image_license: 'CC BY SA 3.0',
  });

  const [dota2] = await Game.findOrCreate({
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
      logo_image: null,
      logo_image_license: null,
      background_image: null,
      background_image_license: null,
    },
  });

  await dota2.update({
    banner_image:
      'https://live.staticflickr.com/3/31426543551_75acf3a4f9_c_d.jpg',
    banner_image_license: 'CC BY SA 2.0',
    background_image: 'https://www.hdwallpapers.net/previews/dota-2-519.jpg',
    background_image_license: 'CC BY SA 3.0',
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
