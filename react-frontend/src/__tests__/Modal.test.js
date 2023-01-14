import React from 'react';
import { render } from '@testing-library/react';
import Modal from "../modules/Modal/Modal";

test('renders Modal component', () => {
    const { container } = render(<Modal show={true} setShow={() => {}} />);
    expect(container).toBeInTheDocument();
});