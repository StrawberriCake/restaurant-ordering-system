FROM --platform=linux/amd64 node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

EXPOSE 8888
CMD [ "node", "index.js" ]