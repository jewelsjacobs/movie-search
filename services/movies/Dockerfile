FROM node:8.1.4-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

EXPOSE 3000 3001

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn global add nodemon && yarn --pure-lockfile
ADD . /app

CMD ["yarn", "docker:${NODE_ENV}"]
