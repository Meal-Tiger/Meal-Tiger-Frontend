import React from 'react';
import { render, cleanup } from '@testing-library/react';
import UploadedImages from "../recipe-editor/uploadedImages";

afterEach(cleanup);

test('renders UploadedImages', () => {
    const images = [
        {url: 'image1.jpg'},
        {url: 'image2.jpg'},
        {url: 'image3.jpg'}
    ];

    const { container } = render(<UploadedImages images={images}/>);

    expect(container.querySelector('.image-container')).toBeInTheDocument();
    expect(container.querySelector('.preview-image-container')).toBeInTheDocument();
    expect(container.querySelector('.first-preview-image')).toBeInTheDocument();
    expect(container.querySelector('.preview-images-right')).toBeInTheDocument();
    expect(container.querySelector('.add-new-image')).toBeInTheDocument();
    expect(container.querySelector('label')).toHaveTextContent('+');
    expect(container.querySelector('input')).toBeInTheDocument();
});