FROM node:20.11.1-bullseye-slim

WORKDIR /src

COPY package*.json ./

RUN npm install -g yarn
RUN yarn

COPY . .

EXPOSE 3000

CMD yarn run dev

