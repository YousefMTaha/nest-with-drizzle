FROM node:18-alpine


RUN npm install -g @nestjs/cli



WORKDIR /app
RUN chown -R node:node /app


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
