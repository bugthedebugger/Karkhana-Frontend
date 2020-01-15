FROM node:12.13.1-alpine

WORKDIR /app

COPY . /app/

RUN npm install
RUN npm run build
CMD [ "npm", "run", "start" ]
EXPOSE 80