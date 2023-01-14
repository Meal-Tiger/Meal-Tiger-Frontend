import { render } from '@testing-library/react';
import Searchbar from "../navbar/Searchbar/Searchbar";

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useNavigate: jest.fn()
    }
});

test('Searchbar renders correctly', () => {
    const { container } = render(<Searchbar />);
    expect(container).toMatchSnapshot();
});
