FROM node:16-alpine3.11 as build-stage

WORKDIR /app

COPY /package*.json ./

RUN npm install

COPY /. .

RUN npm run build

FROM nginx:alpine as production-stage
COPY ./nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
