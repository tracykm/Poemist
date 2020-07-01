FROM node:12
WORKDIR usr/src
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run build
