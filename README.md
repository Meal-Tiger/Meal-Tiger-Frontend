# Meal-Tiger-Frontend

## About

Meal-Tiger is a recipe website. It was made for a uni project for the module "Software Development 3" in the third
semester of the course "BSc Medieninformatik" (engl.: "Computer Science and Media")
at [Hochschule der Medien / Stuttgart Media University](https://www.hdm-stuttgart.de).

The application developed in this repository serves as the frontend for the website.

## How to build and use

### Dependencies

#### Build Dependencies

For building this project you need to have Node.js and npm installed. Depending on your operating system, steps may vary.
Therefore, the below installation instructions might not apply.

[Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/)

### The building process

After cloning the repository you may run the following commands within the react-frontend folder:

`npm ci`

`npm run build --if-present`

After the process of building, you should find the built project in the folder build.

### How to use

To deploy the application you can copy the contents of the build folder to a webserver or build a docker container and deploy that. Instructions for building and deploying the docker container will follow.

## Configuration

To configure the Project you have to specify the following environment variables in the `.env` file in the `src` directory:

* REACT_APP_API_URL
  * The URL, where your Backend is hosted
* REACT_APP_OIDC_CONFIGURATION_ENDPOINT
  * The URL, where your OIDC-Provider specifies the Endpoints
* REACT_APP_OIDC_CLIENT_ID
  * your OIDC client ID

## Dependencies

### Runtime dependencies

| Department | Related to | Name               | License period | Material not material | License type | Link                                                 | Remote version | Installed version | Defined version | Author                                                        |
| :--------- | :--------- | :----------------- | :------------- | :-------------------- | :----------- | :--------------------------------------------------- | :------------- | :---------------- | :-------------- | :------------------------------------------------------------ |
| kessler    | stuff      | @use-gesture/react | perpetual      | material              | MIT          | git+https://github.com/pmndrs/use-gesture.git        | 10.2.24        | 10.2.23           | ^10.2.23        | Paul Henschel                                                 |
| kessler    | stuff      | material-symbols   | perpetual      | material              | Apache-2.0   | git+https://github.com/marella/material-symbols.git  | 0.2.15         | 0.2.13            | ^0.2.13         | n/a                                                           |
| kessler    | stuff      | react              | perpetual      | material              | MIT          | git+https://github.com/facebook/react.git            | 18.2.0         | 18.2.0            | ^18.2.0         | n/a                                                           |
| kessler    | stuff      | react-dom          | perpetual      | material              | MIT          | git+https://github.com/facebook/react.git            | 18.2.0         | 18.2.0            | ^18.2.0         | n/a                                                           |
| kessler    | stuff      | react-router-dom   | perpetual      | material              | MIT          | git+https://github.com/remix-run/react-router.git    | 6.8.1          | 6.4.2             | ^6.4.2          | Remix Software <hello@remix.run>                              |
| kessler    | stuff      | react-scripts      | perpetual      | material              | MIT          | git+https://github.com/facebook/create-react-app.git | 5.0.1          | 5.0.1             | 5.0.1           | n/a                                                           |
| kessler    | stuff      | web-vitals         | perpetual      | material              | Apache-2.0   | git+https://github.com/GoogleChrome/web-vitals.git   | 2.1.4          | 2.1.4             | ^2.1.4          | Philip Walton philip@philipwalton.com http://philipwalton.com |

### Development dependencies

| Department | Related to | Name                        | License period | Material not material | License type | Link                                                             | Remote version | Installed version | Defined version | Author                                                      |
| :--------- | :--------- | :-------------------------- | :------------- | :-------------------- | :----------- | :--------------------------------------------------------------- | :------------- | :---------------- | :-------------- | :---------------------------------------------------------- |
| kessler    | stuff      | @babel/preset-env           | perpetual      | material              | MIT          | https://github.com/babel/babel.git                               | 7.20.2         | 7.20.2            | ^7.20.2         | The Babel Team (https://babel.dev/team)                     |
| kessler    | stuff      | @babel/preset-react         | perpetual      | material              | MIT          | https://github.com/babel/babel.git                               | 7.18.6         | 7.18.6            | ^7.18.6         | The Babel Team (https://babel.dev/team)                     |
| kessler    | stuff      | @testing-library/jest-dom   | perpetual      | material              | MIT          | git+https://github.com/testing-library/jest-dom.git              | 5.16.5         | 5.16.5            | ^5.16.5         | Ernesto Garcia <gnapse@gmail.com> (http://gnapse.github.io) |
| kessler    | stuff      | @testing-library/react      | perpetual      | material              | MIT          | git+https://github.com/testing-library/react-testing-library.git | 13.4.0         | 13.4.0            | ^13.4.0         | Kent C. Dodds <me@kentcdodds.com> (https://kentcdodds.com)  |
| kessler    | stuff      | @testing-library/user-event | perpetual      | material              | MIT          | git+https://github.com/testing-library/user-event.git            | 13.5.0         | 13.5.0            | ^13.5.0         | Giorgio Polvara <polvara@gmail.com>                         |
| kessler    | stuff      | babel-jest                  | perpetual      | material              | MIT          | git+https://github.com/facebook/jest.git                         | 29.4.3         | 29.3.1            | ^29.3.1         | n/a                                                         |
| kessler    | stuff      | jest                        | perpetual      | material              | MIT          | git+https://github.com/facebook/jest.git                         | 27.5.1         | 27.5.1            | ^27.5.1         | n/a                                                         |
| kessler    | stuff      | jest-fetch-mock             | perpetual      | material              | MIT          | git+https://github.com/jefflau/jest-fetch-mock.git               | 3.0.3          | 3.0.3             | ^3.0.3          | Jeff Lau <jeff-lau@live.com> (http://jefflau.net/)          |
| kessler    | stuff      | react-test-renderer         | perpetual      | material              | MIT          | git+https://github.com/facebook/react.git                        | 18.2.0         | 18.2.0            | ^18.2.0         | n/a                                                         |

## Copyright

Meal-Tiger-Frontend (c) 2022 [Kay Knöpfle](https://github.com/Joystick01), [Dorina Sobiecki](https://github.com/DorinaSobiecki), [JohannesHausch](https://github.com/JohannesHausch), [Konstantinos Gimoussiakakis](https://github.com/Kostanix)

SPDX-License-Identifier: GPL-3.0
