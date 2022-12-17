import {
    ADD_LOCATION,
    LOAD_FORECAST_DATA_SUCCESS,
    LOAD_WEATHER_DATA_SUCCESS,
} from '../actions/actionTypes';
import { initialState } from './initialState';

export const locationsReducer = (state = initialState.locations, action) => {
    switch (action.type) {
        case ADD_LOCATION:
            return [action.payload, ...state];

        default:
            return state;
    }
};

export const weatherDataReducer = (
    state = initialState.weatherData,
    action
) => {
    switch (action.type) {
        case LOAD_WEATHER_DATA_SUCCESS:
            // console.log('LOAD_WEATHER_DATA_SUCCESS reducer', [
            //     action.payload,
            //     ...state,
            // ]);
            // return [action.payload, ...state];
            // console.log('LOAD_WEATHER_DATA_SUCCESS reducer', [
            //     action.payload,
            //     ...state,
            // ]);
            // append only new payload items
            if (
                action.payload &&
                !state.some((item) => item.uuid === action.payload.uuid)
            ) {
                console.log('LOAD_WEATHER_DATA_SUCCESS reducer', [
                    action.payload,
                    ...state,
                ]);
                return [action.payload, ...state];
            }

            return state;

        default:
            return state;
    }
};

export const forecastDataReducer = (
    state = initialState.forecastData,
    action
) => {
    switch (action.type) {
        case LOAD_FORECAST_DATA_SUCCESS:
            if (
                action.payload &&
                !state.some((item) => item.uuid === action.payload.uuid)
            ) {
                console.log('LOAD_FORECAST_DATA_SUCCESS reducer', [
                    action.payload,
                    ...state,
                ]);
                return [action.payload, ...state];
            }

            return state;

        default:
            return state;
    }
};
