import { connect } from 'react-redux';
import { Modal, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import moment from 'moment';

import { environment } from '../../environment';
import { formatTemp } from '../../services/utils';
import { loadForecastData } from '../../redux/actions/actions';
import { WeatherCard } from '../shared/WeatherCard';

const ForecastModalComponent = ({
    show,
    setShow,
    location,
    forecastData,
    loadForecastData,
    ...props
}) => {
    const forecast = forecastData.find((item) => item.uuid === location.uuid);
    const [hasLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!forecast && forecastData && !hasLoaded && location) {
            setLoaded(true);

            loadForecastData(location).catch((error) => {
                alert(`Loading forecast data for ${location.label} failed`);
            });
        }
    }, [forecast, forecastData, hasLoaded, location, loadForecastData]);

    return (
        <Modal show={show} onHide={() => setShow(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    {location.label}
                    <h6 className="text-muted">
                        5 Day / 3 Hour Weather Forecast
                    </h6>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="container">
                <div className="row row-cols-12">
                    <WeatherCard
                        className="text-center col m-auto mt-3 mb-3 col-md-5"
                        location={location}
                    />

                    {!forecast?.list && (
                        <div className="col-md-7">Loading forecast...</div>
                    )}

                    {forecast?.list && (
                        <Table className="col-md-7">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Date &amp; Time</th>
                                    <th>Min Temp</th>
                                    <th>Max Temp</th>
                                    <th>Humidity</th>
                                    <th>Condition</th>
                                </tr>
                            </thead>
                            <tbody>
                                {forecast.list.map((weather) => (
                                    <tr key={weather.dt}>
                                        <td>
                                            <img
                                                style={{ height: '25px' }}
                                                src={`${environment.api.path.icons}/${weather.weather[0].icon}.png`}
                                                alt={weather.weather[0].main}
                                            />
                                        </td>
                                        <td>
                                            {moment(weather.dt * 1000).format(
                                                'M/D-HH:mm'
                                            )}
                                        </td>
                                        <td>
                                            {formatTemp(
                                                weather.main.temp_min,
                                                props.unit
                                            )}
                                        </td>
                                        <td>
                                            {formatTemp(
                                                weather.main.temp_max,
                                                props.unit
                                            )}
                                        </td>
                                        <td>{weather.main.humidity}%</td>
                                        <td>{`${weather.weather[0].main} (${weather.weather[0].description})`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    forecastData: state.forecastData,
    unit: state.unit,
});

const mapDispatchToProps = {
    loadForecastData,
};

export const ForecastModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ForecastModalComponent);
