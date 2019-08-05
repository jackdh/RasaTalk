FROM node:10-jessie-slim

RUN apt-get update && apt-get install libpng12-0 bzip2 -y

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

CMD ["yarn", "start:prod"]
