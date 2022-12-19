import axios from 'axios';

import { environment } from '../environment';

import { handleError, handleResponse } from './utils';

const appid = environment.api.key;

export const getGeoLocations = async (search, limit) => {
    const params = { q: search, appid };

    if (limit > 0) {
        params.limit = limit;
    }

    try {
        const req = await axios.get(environment.api.path.geolocation, {
            params,
        });

        return handleResponse(req);
    } catch (error) {
        handleError(error);
    }
};

export const getWeatherData = async (location) => {
    const params = {
        lat: location.lat,
        lon: location.lon,
        appid,
    };

    try {
        const req = await axios.get(environment.api.path.weather, { params });
        const data = handleResponse(req);

        return Object.assign({}, data, { uuid: location.uuid });
    } catch (error) {
        handleError(error);
    }
};

export const getForecastData = async (location) => {
    const params = {
        lat: location.lat,
        lon: location.lon,
        appid,
    };

    try {
        const req = await axios.get(environment.api.path.forecast, { params });
        const data = handleResponse(req);

        return Object.assign({}, data, { uuid: location.uuid });
    } catch (error) {
        handleError(error);
    }
};
