import { createRef, useState } from 'react';
// import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { getGeoLocations } from './services/openWeatherApi';

export const AsyncExample = ({ handleSelected }) => {
    const ref = createRef();
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = async (search) => {
        setIsLoading(true);

        const res = await getGeoLocations(search, 5);
        const options = res.map((option) => ({
            ...option,
            label: `${option.name}, ${option.state ? `${option.state}, ` : ''}${
                option.country
            }`,
            uuid: crypto.randomUUID(),
        }));

        setOptions(options);
        setIsLoading(false);
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
            id="async-example"
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
