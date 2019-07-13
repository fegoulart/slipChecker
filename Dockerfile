FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
#COPY package.json /usr/src/app/
COPY ./app /usr/src/app/

RUN npm install pm2 -g
RUN npm install
#RUN npm i nodemon
#RUN npm i mongoose-auto-increment
#RUN mkdir -p /etc/ssl

RUN mv /etc/localtime /etc/localtime.old
RUN cp /usr/share/zoneinfo/Brazil/East /etc/localtime

# Bundle app source
#COPY . /usr/src/app

EXPOSE 8080
#CMD [ "npm", "start" ]
CMD [ "pm2-runtime", "npm", "--", "start" ]