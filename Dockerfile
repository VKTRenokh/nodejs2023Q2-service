FROM node:18

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm i

ENV PORT=4000

EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]
