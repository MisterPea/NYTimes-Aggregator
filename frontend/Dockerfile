# react build
FROM node:12-alpine as frontend_build

WORKDIR /frontend

COPY package*.json ./
COPY ./src ./src/
COPY webpack.config.js ./

RUN npm install
RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=frontend_build /frontend/dist /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
