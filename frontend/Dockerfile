FROM node:16.19

WORKDIR /vtjmk_frontend

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 5173

CMD ["yarn", "dev:host"]
