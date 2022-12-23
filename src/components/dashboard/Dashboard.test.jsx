import { render, screen } from '@testing-library/react';
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
    UnitSwitcher: () => <>UnitSwitcher Component</>,
}));

jest.mock('../shared/WeatherCard', () => ({
    ...jest.requireActual('../shared/WeatherCard'),
    WeatherCard: () => <>WeatherCard Component</>,
}));

jest.mock('./LocationSearch', () => ({
    ...jest.requireActual('./LocationSearch'),
    LocationSearch: () => <>LocationSearch Component</>,
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
        const outputUnitSwitcher = screen.getByText(/UnitSwitcher Component/);
        const outputWeatherCard = screen.getByText(/WeatherCard Component/);
        const outputLocationSearch = screen.getByText(
            /LocationSearch Component/
        );
        // const outputTest = screen.getByText(/Not Here/);

        // console.log(outputUnitSwitcher);
        expect(outputUnitSwitcher).toBeInTheDocument();
        expect(outputWeatherCard).toBeInTheDocument();
        expect(outputLocationSearch).toBeInTheDocument();
        // expect(outputTest).toBeInTheDocument();
    });
});
