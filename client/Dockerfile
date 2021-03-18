FROM node:alpine as e-commerce-app-build

WORKDIR /client

COPY package.json yarn.lock README.md ./

RUN yarn

COPY ./public ./public

COPY ./src ./src

ENV REACT_APP_BACKEND_URL=http://localhost:5000

RUN yarn build

FROM nginx:latest

LABEL maintainer=Karthik-Aravind

COPY --from=e-commerce-app-build /client/build/ /usr/share/nginx/html

EXPOSE 80