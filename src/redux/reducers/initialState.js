import mockedState from '../../mock-state.json';

export const initialState = {
    unit: 'imperial',

    locations: mockedState.locations,

    weatherData: mockedState.weather,

    forecastData: mockedState.forecast,
};
