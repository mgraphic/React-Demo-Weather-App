import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { switchUnit } from '../../redux/actions/actions';

import './UnitSwitcher.css';

const UnitSwitcherComponent = ({ unit, switchUnit }) => {
    const handleChange = (value) => {
        switchUnit(value);
    };

    return (
        <ToggleButtonGroup
            name="unit-switcher"
            type="radio"
            defaultValue={unit}
            value={unit}
            onChange={handleChange}
            className="mb-3"
        >
            <ToggleButton id="unit-switch-check-imperial" value={'imperial'}>
                Imperial
            </ToggleButton>
            <ToggleButton id="unit-switch-check-standard" value={'standard'}>
                Standard
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

const mapStateToProps = (state) => ({
    unit: state.unit,
});

const mapDispatchToProps = {
    switchUnit: switchUnit,
};

export const UnitSwitcher = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnitSwitcherComponent);
