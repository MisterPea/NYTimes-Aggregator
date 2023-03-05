FROM node:14-alpine

WORKDIR /backend
  
ENV NYT_API_KEY=nDByaIg6JlesybbNCdNId8mQ7ScGOKCD

COPY package*.json ./
COPY /datasource ./datasource/
COPY server.js ./
COPY resolvers.js ./
COPY schema.js ./

# RUN npm install

RUN npm ci --loglevel warn

EXPOSE 4000

CMD ["node", "server.js"]
