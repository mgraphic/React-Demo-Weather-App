import { connect } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';

import { addLocation } from '../../redux/actions/actions';
import { ForecastModal } from '../details/ForecastModal';
import { UnitSwitcher } from '../shared/UnitSwitcher';
import { WeatherCard } from '../shared/WeatherCard';

import { LocationSearch } from './LocationSearch';

const DashboardComponent = ({ locations, addLocation }) => {
    const [showModals, setShowModals] = useState([]);

    useEffect(() => {
        for (let i = 0; i < locations.length; i++) {
            if (!showModals.some((m) => m.uuid === locations[i].uuid)) {
                setShowModals(
                    showModals.concat({ uuid: locations[i].uuid, show: false })
                );
                break;
            }
        }
    }, [locations, showModals]);

    const toggleModalDisplay = (uuid, show) => {
        const modals = showModals.map((modal) => {
            if (modal.uuid === uuid) {
                return { ...modal, show };
            }

            return modal;
        });

        setShowModals(modals);
    };

    const getModalDisplay = (uuid) => {
        const modal = showModals.find((modal) => modal.uuid === uuid);

        if (modal) {
            return modal.show;
        }

        return false;
    };

    const handleSelected = (selected) => {
        addLocation(selected);
    };

    const cardClickHandler = ({ location }) => {
        toggleModalDisplay(location.uuid, true);
    };

    return (
        <div className="container mt-3 mb-3">
            <UnitSwitcher />
            <LocationSearch handleSelected={handleSelected} />

            <div className="row row-cols-md-3">
                {locations.map((location) => (
                    <Fragment key={`fragment-${location.uuid}`}>
                        <WeatherCard
                            className="text-center col mt-3"
                            key={`card-${location.uuid}`}
                            location={location}
                            onClick={cardClickHandler}
                        />

                        {getModalDisplay(location.uuid) && (
                            <ForecastModal
                                location={location}
                                key={`modal-${location.uuid}`}
                                show={() => getModalDisplay(location.uuid)}
                                setShow={() =>
                                    toggleModalDisplay(location.uuid, false)
                                }
                            />
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    locations: state.locations,
});

const mapDispatchToProps = {
    addLocation,
};

export const Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);
