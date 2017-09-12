FROM node:8.1.4-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn global add react-scripts@0.9.5 && yarn --pure-lockfile
ADD . /app

# start app
CMD ["yarn", "start"]
