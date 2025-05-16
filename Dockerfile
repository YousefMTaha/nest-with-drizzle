FROM node:23-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli

RUN npm install -g drizzle-kit

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]
