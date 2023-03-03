FROM node:16.15.1-alpine AS build

COPY . .
RUN apk add git \
    && yarn install  \
    && yarn prisma generate \
    && yarn build

FROM node:16.15.1-alpine

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN apk add --update --no-cache --virtual .build-deps git \
    && yarn install --production  \
    && yarn cache clean \
    && apk del .build-deps

COPY --from=build prisma/schema.prisma prisma/schema.prisma
COPY --from=build prisma/migrations prisma/migrations
COPY --from=build node_modules/.prisma node_modules/.prisma
COPY --from=build dist dist

USER node

CMD [ "node", "dist/src/main" ]

