import { getForecastData, getWeatherData } from '../../services/openWeatherApi';
import {
    ADD_LOCATION,
    LOAD_FORECAST_DATA_SUCCESS,
    LOAD_WEATHER_DATA_SUCCESS,
} from './actionTypes';
import { apiCallError, beginApiCall } from './apiStatusActions';

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

// export const loadWeatherData = (location) => {
//     console.log('loadWeatherData');
//     return (dispatch) => {
//         dispatch(beginApiCall());

//         return getWeatherData(location)
//             .then((payload) => {
//                 console.log('loadWeatherDataSuccess');
//                 dispatch(loadWeatherDataSuccess(payload));
//             })
//             .catch((error) => {
//                 dispatch(apiCallError(error));
//                 throw error;
//             });
//     };
// };

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
