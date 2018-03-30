FROM mhart/alpine-node:8
MAINTAINER jeanycyang

RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY ./package.json /var/www/app

# RUN apk --update --no-cache --virtual dev-dependencies add git python make g++
RUN yarn

COPY . /var/www/app
# RUN npm run build

RUN yarn cache clean
# RUN apk del dev-dependencies

EXPOSE 4000
CMD ["node", "index"]

