FROM node:10-slim

RUN apt-get update && apt-get install libpng12-0 bzip2

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./

COPY . .

RUN yarn install
# If you are building your code for production
#RUN npm install --only=production

# Bundle app source

#RUN yarn build

CMD ["npm", "run", "start"]
