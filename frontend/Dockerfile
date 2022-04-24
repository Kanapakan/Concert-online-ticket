FROM node:lts-alpine 
WORKDIR /usr/src/frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "serve"]

# FROM nginx:1.14.2-alpine AS production
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=0 /usr/src/frontend/build /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]