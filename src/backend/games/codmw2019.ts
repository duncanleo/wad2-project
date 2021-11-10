import axios from 'axios';

type Platform = 'psn' | 'steam' | 'xbl' | 'battle' | 'uno' | 'acti';

const API_URL = 'https://call-of-duty-modern-warfare.p.rapidapi.com/warzone';

const { CODMW_2019_API_KEY } = process.env;

interface Response {
  status: string;
  data: any;
}

export default async function codmw2019(platform: Platform, gamertag: string) {
  const response = await axios.get<Response>(
    `${API_URL}/${gamertag}/${platform}`,
    {
      params: { platform, gamertag },
      headers: {
        'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com',
        'x-rapidapi-key': CODMW_2019_API_KEY,
      },
    }
  );

  return response.data;
}
