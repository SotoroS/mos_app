FROM --platform=linux/amd64 node:20

WORKDIR /app

RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["node", "dist/main"]
