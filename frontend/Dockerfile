FROM node:lts-alpine 
WORKDIR /usr/src/frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "serve"]
