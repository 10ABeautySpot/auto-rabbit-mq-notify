FROM node:12.13.0-alpine
ENV APP_ENV production
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
COPY process.yml .
COPY src/ ./src/
VOLUME ["/var/res"]
RUN pwd
RUN ls -la .
RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata
RUN npm install
RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:max_size 100M
RUN pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
RUN pm2 set pm2-logrotate:retain 7
ENTRYPOINT [ "sh", "-c","pm2-runtime --json process.yml --env $APP_ENV"]

