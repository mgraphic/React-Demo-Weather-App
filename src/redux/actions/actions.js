import { getForecastData, getWeatherData } from '../../services/openWeatherApi';

import { apiCallError, beginApiCall } from './apiStatusActions';
import {
    ADD_LOCATION,
    LOAD_FORECAST_DATA_SUCCESS,
    LOAD_WEATHER_DATA_SUCCESS,
    SWITCH_UNIT,
} from './actionTypes';

export const switchUnit = (payload) => ({
    type: SWITCH_UNIT,
    payload,
});

export const addLocation = (payload) => ({
    type: ADD_LOCATION,
    payload,
});

export const loadWeatherDataSuccess = (payload) => ({
    type: LOAD_WEATHER_DATA_SUCCESS,
    payload,
});

export const loadWeatherData = (location) => async (dispatch) => {
    dispatch(beginApiCall());

    try {
        const payload = await getWeatherData(location);
        dispatch(loadWeatherDataSuccess(payload));
    } catch (error) {
        dispatch(apiCallError(error));
        throw error;
    }
};

export const loadForecastDataSuccess = (payload) => ({
    type: LOAD_FORECAST_DATA_SUCCESS,
    payload,
});

export const loadForecastData = (location) => async (dispatch) => {
    dispatch(beginApiCall());

    try {
        const payload = await getForecastData(location);
        dispatch(loadForecastDataSuccess(payload));
    } catch (error) {
        dispatch(apiCallError(error));
        throw error;
    }
};
