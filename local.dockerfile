FROM node:12-alpine

WORKDIR /app

COPY . /app/

RUN npm install
RUN npm build
EXPOSE 80