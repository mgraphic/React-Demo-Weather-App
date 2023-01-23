import { fireEvent, queryByText, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Dashboard } from './Dashboard';
import { store } from '../../redux/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';

// https://reactjs.org/docs/test-renderer.html
// https://reactjs.org/docs/testing-recipes.html
// https://blog.bitsrc.io/testing-your-react-components-step-by-step-2ce9c3b4f299

// import

// jest.mock('axios')

// const createTestStore=()=>createStore

jest.mock('../shared/UnitSwitcher', () => ({
    ...jest.requireActual('../shared/UnitSwitcher'),
    UnitSwitcher: () => <div>UnitSwitcher Component</div>,
}));

jest.mock('../shared/WeatherCard', () => ({
    ...jest.requireActual('../shared/WeatherCard'),
    WeatherCard: ({ location, onClick }) => (
        <div
            onClick={(e) => {
                e.preventDefault();
                onClick({ location });
            }}
        >
            WeatherCard Component
        </div>
    ),
}));

jest.mock('./LocationSearch', () => ({
    ...jest.requireActual('./LocationSearch'),
    LocationSearch: () => <div>LocationSearch Component</div>,
}));

jest.mock('../details/ForecastModal', () => ({
    ...jest.requireActual('../details/ForecastModal'),
    ForecastModal: () => <div>ForecastModal Component</div>,
}));

// jest.mock('../../services/utils.js', () => ({
//     ...jest.requireActual('../../services/utils.js'),
//     getCurrentPosition: () => ({ lat: 0, lon: 0 }),
// }));

// jest.mock(navigator,()=>({
//     // ...jest.requireActual(navigator),
//     geolocation:()=>({
//         getCurrentPosition:()=>({})
//     })
// }))

// jest.mock('navigator')

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    // watchPosition: jest.fn()
};

describe('Dashboard', () => {
    // let store;

    // beforeEach(()=>{
    //     store = configureStore
    // })

    beforeEach(() => {
        global.navigator.geolocation = mockGeolocation;
    });

    it('should render', () => {
        // const { container } =
        // console.log(

        render(
            <Provider store={store}>
                <QueryClientProvider client={new QueryClient()}>
                    <Dashboard />
                </QueryClientProvider>
            </Provider>
        );
        // )
        // const f=screen.getByText(/UnitSwitcher Component/i)
        // expect(f).toBeTruthy()
        // expect(container).toBeTruthy();
        const outputUnitSwitcher = screen.queryAllByText(
            'UnitSwitcher Component'
        );
        const outputWeatherCard = screen.queryAllByText(
            'WeatherCard Component'
        );

        // fireEvent.click(outputWeatherCard[0]);

        outputWeatherCard.forEach((component) => {
            fireEvent.click(component);
        });

        const outputLocationSearch = screen.queryAllByText(
            'LocationSearch Component'
        );
        // const queryTest = screen.queryAllByText('WeatherCard Component');
        // screen.getByText('WeatherCard Component');
        // console.log('QUERY TEST:', queryTest);
        const outputForecastModal = screen.queryAllByText(
            'ForecastModal Component'
        );

        // console.log('COMPONENTS:', outputWeatherCard);
        // fireEvent.click(queryByText('WeatherCard Component'));
        // const outputTest = screen.getByText(/Not Here/);

        // console.log(outputUnitSwitcher);
        expect(outputUnitSwitcher.length).toBe(1);
        expect(outputUnitSwitcher[0]).toBeInTheDocument();

        expect(outputWeatherCard.length).toBe(1);
        expect(outputWeatherCard[0]).toBeInTheDocument();

        expect(outputLocationSearch.length).toBe(1);
        expect(outputLocationSearch[0]).toBeInTheDocument();

        expect(outputForecastModal.length).toBe(1);
        expect(outputForecastModal[0]).toBeInTheDocument();

        // expect(queryTest.length).toBe(1);
        // expect(outputTest).toBeInTheDocument();
    });
});
