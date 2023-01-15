import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Dropdown from "../navbar/Dropdown/Dropdown";

test('renders Dropdown component', () => {
    const { container } = render(<Dropdown show={true} setShow={() => {}}><div>Dropdown Content</div></Dropdown>);

    expect(container.querySelector('.overlay-container')).toBeInTheDocument();
    expect(container.querySelector('.overlay')).toBeInTheDocument();
    expect(container.querySelector('.dropdown')).toBeInTheDocument();
    expect(container.querySelector('.dropdown').textContent).toBe("Dropdown Content")
});

afterEach(cleanup);