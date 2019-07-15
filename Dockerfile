FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./app /usr/src/app/

RUN npm install pm2 -g
RUN npm install

RUN mv /etc/localtime /etc/localtime.old
RUN cp /usr/share/zoneinfo/Brazil/East /etc/localtime

EXPOSE 8080
CMD [ "pm2-runtime", "npm", "--", "start" ]