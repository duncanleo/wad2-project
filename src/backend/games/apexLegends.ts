import axios from 'axios';

const { APEX_LEGENDS_API_KEY } = process.env;

interface Response {
  data: any;
}

export default async function apexLegends(gamertag: string) {
  const url = `https://public-api.tracker.gg/v2/apex/standard/profile/origin/${gamertag}`;

  const response = await axios.get<Response>(url, {
    params: {},
    headers: {
      'TRN-Api-Key': APEX_LEGENDS_API_KEY,
    },
  });

  return response.data.data;
}
