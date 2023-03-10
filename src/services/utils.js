export const handleResponse = (response) => {
    if (response.statusText === 'OK') {
        return response.data;
    }

    throw new Error('API network response was not ok');
};

export const handleError = (error) => {
    throw error;
};

export const sleep = (time, resolver = () => null) => {
    let timeoutId, rejector;
    const promise = new Promise((resolve, reject) => {
        rejector = reject;
        timeoutId = setTimeout(() => {
            resolver();
            resolve();
        }, time);
    });

    promise.abort = () => {
        clearTimeout(timeoutId);
        rejector('aborted');
    };

    return promise;
};

export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (location) =>
                resolve({
                    lat: location.coords.latitude,
                    lon: location.coords.longitude,
                }),
            reject
        );
    });
};

export const ROUND_ONE_DECIMAL = 10;

export const ROUND_TWO_DECIMAL = 100;

export const roundNumber = (number, roundBy) => {
    if (!roundBy) {
        return Math.round(number);
    }

    return Math.round((number + Number.EPSILON) * roundBy) / roundBy;
};

export const KELVIN_CALC_BASE = 273.15;

export const FAHRENHEIT_CALC_BASE = 32;

export const tempToImperial = (temperature) => {
    const value = roundNumber(
        ((temperature - KELVIN_CALC_BASE) * 9) / 5 + FAHRENHEIT_CALC_BASE,
        ROUND_ONE_DECIMAL
    );

    return `${value}° f`;
};

export const tempToStandard = (temperature) => {
    const value = roundNumber(
        temperature - KELVIN_CALC_BASE,
        ROUND_ONE_DECIMAL
    );

    return `${value}° c`;
};

export const formatTemp = (temperature, unit) => {
    switch (unit) {
        case 'imperial':
            return tempToImperial(temperature);
        case 'standard':
            return tempToStandard(temperature);

        default:
            return temperature;
    }
};

export const METERS_PER_SEC_CALC_BASE = 2.237;

export const speedToImperial = (speed) => {
    const value = roundNumber(
        speed * METERS_PER_SEC_CALC_BASE,
        ROUND_TWO_DECIMAL
    );

    return `${value} mph`;
};

export const speedToStandard = (speed) => {
    const value = roundNumber(speed, ROUND_TWO_DECIMAL);

    return `${value} m/s`;
};

export const formatSpeed = (speed, unit) => {
    switch (unit) {
        case 'imperial':
            return speedToImperial(speed);
        case 'standard':
            return speedToStandard(speed);

        default:
            return speed;
    }
};

export const INCHES_CALC_BASE = 25.4;

export const sizeToImperial = (size) => {
    const value = roundNumber(size / INCHES_CALC_BASE, ROUND_TWO_DECIMAL);

    return `${value} in`;
};

export const sizeToStandard = (size) => {
    const value = roundNumber(size, ROUND_TWO_DECIMAL);

    return `${value} mm`;
};

export const formatSize = (size, unit) => {
    switch (unit) {
        case 'imperial':
            return sizeToImperial(size);
        case 'standard':
            return sizeToStandard(size);

        default:
            return size;
    }
};

export const MILES_CALC_BASE = 1609;

export const KILOMETER_CALC_BASE = 1000;

export const distanceToImperial = (distance) => {
    const value = roundNumber(distance / MILES_CALC_BASE, ROUND_ONE_DECIMAL);

    return `${value} mi`;
};

export const distanceToStandard = (distance) => {
    const value = roundNumber(
        distance / KILOMETER_CALC_BASE,
        ROUND_ONE_DECIMAL
    );

    return `${value} km`;
};

export const formatDistance = (distance, unit) => {
    switch (unit) {
        case 'imperial':
            return distanceToImperial(distance);
        case 'standard':
            return distanceToStandard(distance);

        default:
            return distance;
    }
};
