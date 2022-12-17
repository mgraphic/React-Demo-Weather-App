import { Fragment, useEffect, useState } from 'react';
// import { Col, Row, Stack } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { ModalExample } from '../../ModalExample';
import { addLocation } from '../../redux/actions/actions';
import { ForecastModal } from '../details/ForecastModal';
import { WeatherCard } from '../shared/WeatherCard';
// import { AsyncExample } from '../../AsyncExample';
import { LocationSearch } from './LocationSearch';

const DashboardComponent = ({ locations, addLocation }) => {
    const [showModals, setShowModals] = useState([]);

    useEffect(() => {
        // const modals = locations.map(location=>{
        //     if(!showModals.some(m=>m.uuid===location.uuid)){
        //         return location
        //     }
        // })
        // if(!showModals.some(m=>m.uuid===location.uuid))
        for (let i = 0; i < locations.length; i++) {
            if (!showModals.some((m) => m.uuid === locations[i].uuid)) {
                setShowModals(
                    showModals.concat({ uuid: locations[i].uuid, show: false })
                );
                break;
            }
        }
        // setShowModals([]);
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
        console.log('Processing click from DashboardComponent', location);
        toggleModalDisplay(location.uuid, true);
    };
    return (
        <div className="container mt-3 mb-3">
            <LocationSearch handleSelected={handleSelected} />

            {/* <div className="d-flex flex-wrap justify-content-between"> */}
            <div
                // className="d-grid gap-5 h-100"
                className="row row-cols-md-3"
                // style={{ gridTemplateColumns: 'repeat(auto-fill, 30rem)' }}
            >
                {locations.map((location) => (
                    // <div key={location.uuid}>{location.label}</div>
                    // <div
                    // className="shadow-sm m-4"
                    // className="grid"
                    // style={{ width: '30rem', minWidth: '30rem' }}
                    // >
                    <Fragment key={location.uuid}>
                        <WeatherCard
                            // className="text-center h-100 g-col-4"
                            // className="g-col-6"
                            // style={{ maxWidth: '25rem' }}
                            className="text-center col mt-3"
                            // style={{}}
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
                    // </div>
                ))}
            </div>
            {/* </div> */}
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
