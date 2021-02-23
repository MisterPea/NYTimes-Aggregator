FROM node:14-alpine

WORKDIR /backend
  
ENV NYT_API_KEY=nDByaIg6JlesybbNCdNId8mQ7ScGOKCD

COPY package*.json ./
COPY /routes ./routes/
COPY server.js ./

# RUN npm install

RUN npm ci --loglevel warn

EXPOSE 80

CMD ["node", "server.js"]
