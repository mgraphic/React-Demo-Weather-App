import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { environment } from '../../environment';
import { loadWeatherData } from '../../redux/actions/actions';
import {
    formatDistance,
    formatSize,
    formatSpeed,
    formatTemp,
} from '../../services/utils';

const WeatherCardComponent = ({
    location,
    weatherData,
    loadWeatherData,
    ...props
}) => {
    const weather = weatherData.find((item) => item.uuid === location.uuid);
    const [hasLoaded, setLoaded] = useState(false);
    const [role, setRole] = useState('default');

    useEffect(() => {
        if (props.onClick) {
            setRole('button');
        }
    }, [props.onClick]);

    useEffect(() => {
        if (!weather && weatherData && !hasLoaded && location) {
            setLoaded(true);

            loadWeatherData(location).catch((error) => {
                alert(`Loading weather data for ${location.label} failed`);
            });
        }
    }, [weather, weatherData, hasLoaded, location, loadWeatherData]);

    const handleClick = (event) => {
        if (role === 'button') {
            event.preventDefault();
            props.onClick({ event, location, weatherData });
        }
    };

    if (!weather?.weather) {
        return <></>;
    }

    return (
        <div className={props.className} style={props.style}>
            <Card role={role} onClick={handleClick} className="h-100">
                <Card.Body>
                    <Card.Title>{location.label}</Card.Title>
                    <Card.Subtitle className="text-muted">
                        {weather.weather[0].main} (
                        {weather.weather[0].description})
                    </Card.Subtitle>
                    {/* <Card.Text> */}
                    <img
                        src={`${environment.api.path.icons}/${weather.weather[0].icon}@4x.png`}
                        alt={weather.weather[0].main}
                    />
                    {/* <div> */}
                    <Container className="mb-3">
                        <Row>
                            <Col className="text-end text-uppercase fw-bold text-secondary">
                                Temp:
                            </Col>
                            <Col className="text-start">
                                {formatTemp(weather.main.temp, props.unit)}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-end text-uppercase fw-bold text-secondary">
                                Feels like:
                            </Col>
                            <Col className="text-start">
                                {formatTemp(
                                    weather.main.feels_like,
                                    props.unit
                                )}
                            </Col>
                        </Row>
                        {weather.main.humidity > 0 && (
                            <Row>
                                <Col className="text-end text-uppercase fw-bold text-secondary">
                                    Humidity:
                                </Col>
                                <Col className="text-start">
                                    {weather.main.humidity}%
                                </Col>
                            </Row>
                        )}
                        {weather.wind?.speed > 0 && (
                            <Row>
                                <Col className="text-end text-uppercase fw-bold text-secondary">
                                    Wind speed:
                                </Col>
                                <Col className="text-start">
                                    {formatSpeed(
                                        weather.wind.speed,
                                        props.unit
                                    )}{' '}
                                    ({weather.wind.deg}&deg;)
                                </Col>
                            </Row>
                        )}
                        {weather.clouds?.all > 0 && (
                            <Row>
                                <Col className="text-end text-uppercase fw-bold text-secondary">
                                    Cloudiness:
                                </Col>
                                <Col className="text-start">
                                    {weather.clouds.all}%
                                </Col>
                            </Row>
                        )}
                        {weather.rain && weather.rain['1h'] && (
                            <Row>
                                <Col className="text-end text-uppercase fw-bold text-secondary">
                                    Rain last hour:
                                </Col>
                                <Col className="text-start">
                                    {formatSize(weather.rain['1h'], props.unit)}
                                </Col>
                            </Row>
                        )}
                        {weather.rain && weather.rain['3h'] && (
                            <Row>
                                <Col className="text-end text-uppercase fw-bold text-secondary">
                                    Rain last 3 hours:
                                </Col>
                                <Col className="text-start">
                                    {formatSize(weather.rain['3h'], props.unit)}
                                </Col>
                            </Row>
                        )}
                        {weather.snow && weather.snow['1h'] && (
                            <Row>
                                <Col className="text-end text-uppercase fw-bold text-secondary">
                                    Snow last hour:
                                </Col>
                                <Col className="text-start">
                                    {formatSize(weather.snow['1h'], props.unit)}
                                </Col>
                            </Row>
                        )}
                        {weather.snow && weather.snow['3h'] && (
                            <Row>
                                <Col className="text-end text-uppercase fw-bold text-secondary">
                                    Snow last 3 hours:
                                </Col>
                                <Col className="text-start">
                                    {formatSize(weather.snow['3h'], props.unit)}
                                </Col>
                            </Row>
                        )}
                        {weather.visibility && (
                            <Row>
                                <Col className="text-end text-uppercase fw-bold text-secondary">
                                    Visibility:
                                </Col>
                                <Col className="text-start">
                                    {formatDistance(
                                        weather.visibility,
                                        props.unit
                                    )}
                                </Col>
                            </Row>
                        )}
                    </Container>

                    {role === 'button' && (
                        <Card.Link href="#" onClick={(e) => e.preventDefault()}>
                            Get Forecast
                        </Card.Link>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

const mapStateToProps = (state) => ({
    weatherData: state.weatherData,
    unit: state.unit,
});

const mapDispatchToProps = {
    loadWeatherData,
};

export const WeatherCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(WeatherCardComponent);
