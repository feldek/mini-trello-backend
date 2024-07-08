FROM node:20.10.0-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY .. .

CMD ["npm", "start"]