FROM node

WORKDIR /diary

COPY ./package.json .
COPY ./wait-for-it.sh .
COPY ./ormconfig.json .
COPY ./packages/typegraphql_boilerplate/package.json ./packages/typegraphql_boilerplate/
COPY ./packages/typegraphql_boilerplate/.env ./packages/typegraphql_boilerplate/

RUN npm i -g yarn
RUN yarn install --production

COPY ./packages/typegraphql_boilerplate/dist ./packages/typegraphql_boilerplate/dist

WORKDIR /diary/packages/typegraphql_boilerplate
ENV NODE_ENV production

EXPOSE 4000
CMD node ./dist/index.js