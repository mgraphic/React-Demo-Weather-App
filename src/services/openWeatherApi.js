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
    // console.log('getWeatherData');
    // const data = JSON.parse(
    //     '{"coord":{"lon":-82.4572,"lat":27.9506},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":287.67,"feels_like":286.98,"temp_min":285.9,"temp_max":289.3,"pressure":1017,"humidity":69},"visibility":10000,"wind":{"speed":2.57,"deg":30},"clouds":{"all":100},"dt":1671198485,"sys":{"type":2,"id":2005199,"country":"US","sunrise":1671192854,"sunset":1671230210},"timezone":-18000,"id":4174757,"name":"Tampa","cod":200}'
    // );
    // return Object.assign({}, data, { uuid: location.uuid });
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
