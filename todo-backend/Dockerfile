FROM registry.access.redhat.com/ubi8:8.0

WORKDIR /usr/src/app/

ENV NVM_DIR /usr/src/nvm
ENV NODE_VERSION 14.16.1

COPY ["package.json", "./"]

RUN mkdir $NVM_DIR \
    && curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && npm install \
    && npm config set unsafe-perm true && npm ci --quiet

COPY app.js .
COPY models ./models
COPY controllers ./controllers

RUN groupadd -g 1100 demo && \
    adduser --system --no-create-home --uid 1100 --groups demo demo-user && \
    chown -R demo-user:demo /usr/src/app && chmod -R g+rwX /usr/src/app

EXPOSE 8100

USER demo-user

CMD . $NVM_DIR/nvm.sh \
    && npm start 