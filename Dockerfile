FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm i && npm cache clean --force

EXPOSE ${PORT}

COPY . .

CMD [ "npm", "run", "start:dev" ]
