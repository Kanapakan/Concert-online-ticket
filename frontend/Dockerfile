FROM node:lts-alpine 
WORKDIR /usr/src/frontend
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "serve", "--", "--port", "80"]
