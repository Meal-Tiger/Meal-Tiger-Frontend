import React from 'react';
import {render, screen} from '@testing-library/react';
import ProfileImageInput from "../profile/profile-image-input/ProfileImageInput";

jest.mock('../modules/api', () => ({
    getImageUrl: jest.fn(() => 'test-image-url'),
}));

// mock the createObjectURL method
URL.createObjectURL = jest.fn();

describe('ProfileImageInput', () => {

    it('renders the default message when no image or profilePictureId is provided', () => {
        render(<ProfileImageInput />);
        const message = screen.getByLabelText(/Du hast momentan noch kein Profilbild hochgeladen/i);
        expect(message).toBeInTheDocument();
    });

    it("renders with image", () => {
        const props = {
            setImage: jest.fn()
        };
        const image = new File(["(⌐□_□)"], "image.png", { type: "image/png" });
        render(<ProfileImageInput {...props} image={image} />);

        expect(screen.getByAltText("")).toBeInTheDocument();
    });

    it("renders with picture ID", () => {
        const props = {
            profilePictureId: "123"
        };

        const image = new File(["(⌐□_□)"], "image.png", { type: "image/png" });
        render(<ProfileImageInput {...props} image={image} />);

        expect(screen.getByAltText("")).toBeInTheDocument();
    });
});