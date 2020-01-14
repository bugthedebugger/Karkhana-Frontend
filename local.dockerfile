FROM node:12.13.1-alpine

WORKDIR /app

COPY . /app/

RUN npm install
RUN npm build
EXPOSE 3333