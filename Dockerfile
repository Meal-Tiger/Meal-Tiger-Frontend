# syntax=docker/dockerfile:1
FROM httpd:latest
COPY ./react-frontend/build /usr/local/apache2/htdocs/
