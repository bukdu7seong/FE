# syntax=docker/dockerfile:1
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf && mkdir /certs && chmod 644 /certs
COPY nginx.conf /etc/nginx/conf.d
COPY localhost.key /certs/localhost.key
COPY localhost.pem /certs/localhost.pem

EXPOSE 443
