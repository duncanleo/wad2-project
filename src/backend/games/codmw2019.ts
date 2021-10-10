import axios from 'axios';

type Platform = 'psn' | 'steam' | 'xbl' | 'battle' | 'uno' | 'acti';

const API_URL = 'https://call-of-duty4.p.rapidapi.com/warzone';

const { CODMW_2019_API_KEY } = process.env;

interface Response {
  status: string;
  data: any;
}

export default async function codmw2019(platform: Platform, gamertag: string) {
  console.log('wow', platform, gamertag);
  const response = await axios.get<Response>(API_URL, {
    params: { platform, gamertag },
    headers: {
      'x-rapidapi-host': 'call-of-duty4.p.rapidapi.com',
      'x-rapidapi-key': CODMW_2019_API_KEY,
    },
  });

  return response.data.data;
}
