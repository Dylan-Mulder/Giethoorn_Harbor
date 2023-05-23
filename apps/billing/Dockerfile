FROM node

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

COPY . .
