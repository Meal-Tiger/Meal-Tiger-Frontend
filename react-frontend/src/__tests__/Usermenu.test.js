import React from 'react';
import {render} from '@testing-library/react';
import Usermenu from "../navbar/Usermenu/Usermenu";

jest.mock('modules/oidc', () => {
    return {
        logout: jest.fn().mockImplementation(() => {})
    }
});

jest.mock('../modules/api', () => ({
    ...jest.requireActual('../modules/api'),
    useGetUser: () => {return [
        {
            "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "username": "string",
            "picture": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }, null]}
}));

jest.mock('modules/events', () => {
    return {
        useEvent: jest.fn()
    }
});


test('Usermenu component renders properly', () => {
    const { container } = render(<Usermenu />);
    expect(container).toBeInTheDocument();
});
