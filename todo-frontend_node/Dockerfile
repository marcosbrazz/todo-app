FROM node:16-alpine

RUN apk update && apk upgrade && apk add python2 \
    && apk add build-base && apk add libc6-compat \
    && echo "n" | npm install -g @angular/cli \
    && npm config set unsafe-perm true

WORKDIR /usr/src/app/angular
COPY angular/package.json ./
COPY angular/package-lock.json ./
RUN npm install

WORKDIR /usr/src/app/server
COPY server/package.json ./
COPY server/package-lock.json ./
RUN npm install --production

WORKDIR /usr/src/app
COPY server ./server
COPY angular ./angular
RUN cd angular && \
    npm run build && \
    cd .. && \
    rm -rf angular

EXPOSE 8080

RUN addgroup -g 1100 demo && adduser --system --disabled-password --no-create-home --uid 1100 demo-user demo
RUN chown -R demo-user:demo /usr/src/app && chmod -R g+rwX /usr/src/app
USER demo-user

CMD cd server && npm start
