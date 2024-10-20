# Dependencias
FROM node:21-alpine3.19 AS deps

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Builder
FROM node:21-alpine3.19 AS build

ARG PRODUCTS_DATABASE_URL
ENV DATABASE_URL=$PRODUCTS_DATABASE_URL

RUN echo "database_url ::: $PRODUCTS_DATABASE_URL";

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

RUN yarn build

RUN yarn --production --ignore-scripts

# Production
FROM node:21-alpine3.19 AS prod

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production

USER node

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
