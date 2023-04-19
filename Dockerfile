
FROM node:16.16.0
WORKDIR /kneeboard-ga
COPY package.json /kneeboard-ga
RUN npm install
COPY . /kneeboard-ga
CMD ["node", "server.js"]
EXPOSE 8080