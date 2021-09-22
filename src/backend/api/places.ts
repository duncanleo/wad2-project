import axios from 'axios';
import { Request, Response } from 'express';
import Joi from 'joi';

import { FOURSQUARE_API_ROOT_URL } from '../constants';
import { ErrorInternalServerError, ErrorUnauthorized } from '../errors';
import getRequestContext from '../util/getRequestContext';

interface NearbyQueryParams {
  lat: number;
  lon: number;
}

const NearbyQueryParamsSchema = Joi.object<NearbyQueryParams>({
  lat: Joi.number().required(),
  lon: Joi.number().required(),
});

export async function placesNearby(req: Request, res: Response) {
  const context = await getRequestContext(req);
  const { user } = context;

  if (user == null) {
    throw new ErrorUnauthorized();
  }

  const validationResult = NearbyQueryParamsSchema.validate(req.query);

  if (validationResult.error) {
    throw validationResult.error;
  }

  const { lat, lon } = validationResult.value as NearbyQueryParams;

  const response = await axios.get<
    Foursquare.API.Response<Foursquare.API.VenueExploreResults>
  >(`${FOURSQUARE_API_ROOT_URL}/venues/explore`, {
    params: {
      client_id: process.env.FOURSQUARE_CLIENT_ID,
      client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
      ll: `${lat},${lon}`,
      v: '20201001',
      sortByDistance: true,
    },
  });

  const {
    headerLocation,
    headerLocationGranularity,
    headerFullLocation,
    groups,
  } = response.data.response;

  const firstGroup = groups[0];

  if (firstGroup == null) {
    throw new ErrorInternalServerError();
  }

  const data: App.API.Result<App.API.NearbyResult> = {
    status: true,
    data: {
      headerLocation,
      headerFullLocation,
      headerLocationGranularity,
      items: firstGroup.items,
    },
  };

  res.status(200).json(data).end();
}
