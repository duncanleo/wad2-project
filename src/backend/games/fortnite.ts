import axios from 'axios';

const { FORTNITE_API_KEY } = process.env;

export default async function fortnite(gamertag: string) {
  const url = `https://fortnite-api.p.rapidapi.com/stats/${gamertag}`;

  const response = await axios.get(url, {
    params: {},
    headers: {
      'x-rapidapi-host': 'fortnite-api.p.rapidapi.com',
      'x-rapidapi-key': FORTNITE_API_KEY,
    },
  });

  return response.data;
}
