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

A guide on how to configure the application will follow.

## Dependencies

### Runtime dependencies

|Dependency|Creator|License|
|:--:|:--:|:--:|
|[Spring Boot Framework](https://github.com/spring-projects/spring-boot)|[VMware, Inc. and contributors](https://github.com/spring-projects)|[Apache-2.0 License](https://github.com/spring-projects/spring-boot/blob/main/LICENSE.txt)|
|[Spring Data MongoDB](https://github.com/spring-projects/spring-data-mongodb)|[VMware, Inc. and contributors](https://github.com/spring-projects)|[Apache-2.0 License](https://github.com/spring-projects/spring-data-mongodb/blob/main/LICENSE.txt)|
|[Okta Spring Boot Starter](https://github.com/okta/okta-spring-boot)|[Okta](https://github.com/okta)|[Apache-2.0 License](https://opensource.org/licenses/Apache-2.0)|
|[SnakeYAML](https://bitbucket.org/snakeyaml/snakeyaml/src/master/)|[SnakeYAML team of developers](https://bitbucket.org/snakeyaml/snakeyaml/src)|[Apache-2.0 License](https://bitbucket.org/snakeyaml/snakeyaml/src/master/LICENSE.txt)|

### Testing dependencies

|Dependency|Creator|License|
|:--:|:--:|:--:|
|[Spring Boot Test Starter](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test/2.7.5)|[VMware, Inc. and contributors](https://github.com/spring-projects)|[Apache-2.0 License](https://opensource.org/licenses/Apache-2.0)

## Copyright

Meal-Tiger-Frontend (c) 2022 [Kay Knöpfle](https://github.com/Joystick01), [Dorina Sobiecki](https://github.com/DorinaSobiecki), [JohannesHausch](https://github.com/JohannesHausch), [Konstantinos Gimoussiakakis](https://github.com/Kostanix)

SPDX-License-Identifier: GPL-3.0
