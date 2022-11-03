FROM node:16.16.0

ARG NODE_ENV
ARG APP_PORT
ARG APP_NAME
ARG API_PREFIX
ARG MONGO_USERNAME
ARG MONGO_PASSWORD
ARG MONGO_DATABASE
ARG MONGO_HOST

ENV NODE_ENV=$NODE_ENV
ENV APP_PORT=$APP_PORT
ENV APP_NAME=$APP_NAME
ENV API_PREFIX=$API_PREFIX
ENV MONGO_USERNAME=$MONGO_USERNAME
ENV MONGO_PASSWORD=$MONGO_PASSWORD
ENV MONGO_DATABASE=$MONGO_DATABASE
ENV MONGO_HOST=$MONGO_HOST

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
# RUN yarn build
EXPOSE 3001
CMD [ "yarn", "start:dev" ]