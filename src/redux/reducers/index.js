import { combineReducers } from 'redux';
import {
    forecastDataReducer,
    locationsReducer,
    weatherDataReducer,
} from './reducers';

export const rootReducer = combineReducers({
    // faux: (state = null) => state,
    locations: locationsReducer,
    weatherData: weatherDataReducer,
    forecastData: forecastDataReducer,
});
