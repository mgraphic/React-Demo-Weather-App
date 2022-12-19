import {
    ADD_LOCATION,
    LOAD_FORECAST_DATA_SUCCESS,
    LOAD_WEATHER_DATA_SUCCESS,
    SWITCH_UNIT,
} from '../actions/actionTypes';

import { initialState } from './initialState';

export const unitSwitchReducer = (state = initialState.unit, action) => {
    switch (action.type) {
        case SWITCH_UNIT:
            return action.payload;
        default:
            return state;
    }
};

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
            if (
                action.payload &&
                !state.some((item) => item.uuid === action.payload.uuid)
            ) {
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
                return [action.payload, ...state];
            }

            return state;

        default:
            return state;
    }
};
