import { render, screen } from '@testing-library/react';
import { App } from './App';

// jest.mock('./services/utils', () => ({
//     ...jest.requireActual(),
//     getUserLocation: () => ({ loc: 0, lat: 0 }),
// }));

jest.mock('./components/dashboard/Dashboard', () => ({
    ...jest.requireActual(),
    Dashboard: () => <>Dashboard</>,
}));

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Dashboard/i);
    expect(linkElement).toBeInTheDocument();
    // expect(true).toBeTruthy();
    // expect()
});
