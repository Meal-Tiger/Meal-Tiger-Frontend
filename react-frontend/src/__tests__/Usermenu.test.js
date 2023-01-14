import React from 'react';
import {render} from '@testing-library/react';
import Usermenu from "../navbar/Usermenu/Usermenu";

jest.mock('modules/oidc', () => {
    return {
        logout: jest.fn()
    }
});

jest.mock('modules/events', () => {
    return {
        useEvent: jest.fn()
    }
});


test('Usermenu component renders properly', () => {
    const { container } = render(<Usermenu />);
    expect(container).toBeInTheDocument();
});
