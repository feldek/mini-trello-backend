FROM node:20.18.0-alpine3.19 as build

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the current directory contents to the container at /app
COPY . .

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app

ARG REACT_APP_API
ARG REACT_APP_TEST

ENV REACT_APP_API $REACT_APP_API
ENV REACT_APP_TEST $REACT_APP_TEST

ARG APP_API_URL
ARG APP_ENV

RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]