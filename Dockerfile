FROM node:23-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli

RUN npm install -g drizzle-kit

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

ENV DB_URL=postgres://postgres:admin@postgres:5432/inventory_management

CMD ["npm","start"]
