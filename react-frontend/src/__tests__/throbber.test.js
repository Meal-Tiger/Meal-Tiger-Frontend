import React from 'react';
import { render } from '@testing-library/react';
import Throbber from "../modules/throbber/throbber";

test('renders Throbber component', () => {
    const { container } = render(<Throbber />);
    expect(container.querySelector('.lds-ring')).toBeInTheDocument();
});