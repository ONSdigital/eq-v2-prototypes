FROM node:16-alpine3.17

WORKDIR /app

COPY . .

RUN npm install
RUN npm rebuild node-sass

EXPOSE 3000

CMD ["npm", "start"]
