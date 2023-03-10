import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { createRef, useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

import { getGeoLocations } from '../../services/openWeatherApi';

export const LocationSearch = ({ handleSelected }) => {
    const ref = createRef();
    const [isLoading, setLoadingState] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = async (search) => {
        setLoadingState(true);

        const res = await getGeoLocations(search, 5);
        const options = res.map((option) => ({
            ...option,
            label: `${option.name}, ${option.state ? `${option.state}, ` : ''}${
                option.country
            }`,
            uuid: crypto.randomUUID(),
        }));

        setOptions(options);
        setLoadingState(false);
    };

    const handleChange = (option) => {
        const selectedOption = option.shift();

        setOptions([]);
        handleSelected(selectedOption);
        ref.current.clear();
    };

    return (
        <AsyncTypeahead
            ref={ref}
            clearButton
            id="location-search"
            isLoading={isLoading}
            labelKey="label"
            minLength={3}
            onSearch={handleSearch}
            onChange={handleChange}
            options={options}
            placeholder="Search for city..."
            renderMenuItemChildren={(option) => <span>{option.label}</span>}
        />
    );
};
