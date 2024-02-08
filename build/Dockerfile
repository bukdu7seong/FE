# syntax=docker/dockerfile:1
FROM nginx:alpine

COPY ../ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
