FROM node:lts-alpine
WORKDIR /usr/app/backend
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]
