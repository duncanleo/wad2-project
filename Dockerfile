FROM node:14-bullseye

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

ENTRYPOINT ["./docker-start.sh"]