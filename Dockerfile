FROM node:8.16.2 as builder

WORKDIR /usr/src/app

COPY package*.json ./
#RUN rmdir /usr/src/app/build
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.16.1

RUN rm -fr /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/

COPY --from=builder /usr/src/app/build /usr/share/nginx/html


