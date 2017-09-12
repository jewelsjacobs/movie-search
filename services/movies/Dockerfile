FROM node:8.1.4-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn global add nodemon && yarn --pure-lockfile
ADD . /app

CMD ["yarn", "docker:start"]
