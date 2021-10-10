import axios from 'axios';

export default async function dota2(gamertag: string) {
  const url = `https://api.opendota.com/api/players/${gamertag}`;

  const response = await axios.get(url);

  return response.data;
}
