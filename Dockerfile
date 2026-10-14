FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ..
RUN npm run build
FROM nginx:alpineCOPY --form=build /app/dist /usr/share/html
EXPOSE 80
CMD["nginx","-g","daemon off;"]