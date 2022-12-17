export const environment = {
    api: {
        key: process.env.REACT_APP_OPENWEATHER_API_KEY,
        path: {
            weather: process.env.REACT_APP_OPENWEATHER_API_URL_WEATHER,
            forecast: process.env.REACT_APP_OPENWEATHER_API_URL_FORECAST,
            geolocation: process.env.REACT_APP_OPENWEATHER_API_URL_GEOLOCATION,
            icons: process.env.REACT_APP_OPENWEATHER_API_URL_ICONS,
        },
    },
};
