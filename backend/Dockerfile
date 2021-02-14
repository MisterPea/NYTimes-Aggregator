FROM node:12-alpine

WORKDIR /backend

COPY package*.json ./
COPY /routes ./routes/ 
COPY server.js ./

RUN npm install

EXPOSE 8090

CMD ["node", "server.js"]