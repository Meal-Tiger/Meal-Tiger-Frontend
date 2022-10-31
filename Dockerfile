# syntax=docker/dockerfile:1
FROM httpd:latest
COPY ./react-frontend/public /usr/local/apache2/htdocs/
