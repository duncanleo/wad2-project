import moment from 'moment';

import playersData from '../backend/initdata/players.json';
import tournamentData from '../backend/initdata/tournaments.json';
import { Game, GameAccount, Tournament, User } from '../backend/model';
import { SUPPORTED_GAMES } from '../constants';

async function createTournament(
  tns: typeof tournamentData['warzone'],
  game_id: number
) {
  for (const tn of tns) {
    const [organiser] = await User.findOrCreate({
      where: {
        display_name: tn.organizer,
      },
      defaults: {
        display_name: tn.organizer,
        password: '',
        email: `${tn.organizer}@example.com`,
        bio: null,
        type: 'organiser',
      },
    });

    const [tournament, created] = await Tournament.findOrCreate({
      where: {
        name: tn.name,
      },
      defaults: {
        name: tn.name,
        prize_pool: tn.prize_pool,
        start_at: moment(tn.start_date).toDate(),
        end_at: moment(tn.end_date).toDate(),
        url: tn.link,
        owner_id: organiser.id,
        region: tn.region,
        banner_image: tn.banner_image ?? null,
        banner_image_license: tn.banner_image_license ?? null,
        game_id,
      },
    });

    if (!created) {
      await tournament.update({
        name: tn.name,
        prize_pool: tn.prize_pool,
        start_at: moment(tn.start_date).toDate(),
        end_at: moment(tn.end_date).toDate(),
        url: tn.link,
        owner_id: organiser.id,
        region: tn.region,
        banner_image: tn.banner_image ?? null,
        banner_image_license: tn.banner_image_license ?? null,
        game_id,
      });
    }
  }
}

async function run() {
  const [codmw] = await Game.findOrCreate({
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

  await codmw.update({
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

  const { warzone, fortnite: fnt, apex, dota2: dota } = tournamentData;

  await createTournament(warzone, codmw.id);
  await createTournament(fnt, fortnite.id);
  await createTournament(apex, apexLegends.id);
  await createTournament(dota, dota2.id);

  const {
    warzone: wzPlayers,
    fortnite: fntPlayers,
    apex: apexPlayers,
    dota2: dotaPlayers,
  } = playersData;

  // Disabled because Warzone API is not working
  // for (const player of wzPlayers) {
  //   const [user] = await User.findOrCreate({
  //     where: {
  //       display_name: player.ign,
  //     },
  //     defaults: {
  //       display_name: player.ign,
  //       email: `${player.ign}@example.com`,
  //       password: '',
  //       bio: null,
  //       type: 'gamer',
  //     },
  //   });

  //   await GameAccount.findOrCreate({
  //     where: {
  //       user_id: user.id,
  //       game_id: codmw.id,
  //     },
  //     defaults: {
  //       data: player.data,
  //       user_id: user.id,
  //       game_id: codmw.id,
  //     },
  //   });
  // }

  for (const player of fntPlayers) {
    const [user] = await User.findOrCreate({
      where: {
        display_name: player.ign,
      },
      defaults: {
        display_name: player.ign,
        email: `${player.ign}@example.com`,
        password: '',
        bio: null,
        type: 'gamer',
      },
    });

    await GameAccount.findOrCreate({
      where: {
        user_id: user.id,
        game_id: fortnite.id,
      },
      defaults: {
        data: player.data,
        user_id: user.id,
        game_id: fortnite.id,
      },
    });
  }
  for (const player of apexPlayers) {
    const [user] = await User.findOrCreate({
      where: {
        display_name: player.ign,
      },
      defaults: {
        display_name: player.ign,
        email: `${player.ign}@example.com`,
        password: '',
        bio: null,
        type: 'gamer',
      },
    });

    await GameAccount.findOrCreate({
      where: {
        user_id: user.id,
        game_id: apexLegends.id,
      },
      defaults: {
        data: player.data,
        user_id: user.id,
        game_id: apexLegends.id,
      },
    });
  }
  for (const player of dotaPlayers) {
    const [user] = await User.findOrCreate({
      where: {
        display_name: player.ign,
      },
      defaults: {
        display_name: player.ign,
        email: `${player.ign}@example.com`,
        password: '',
        bio: null,
        type: 'gamer',
      },
    });

    await GameAccount.findOrCreate({
      where: {
        user_id: user.id,
        game_id: dota2.id,
      },
      defaults: {
        data: player.data,
        user_id: user.id,
        game_id: dota2.id,
      },
    });
  }
}

run()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
