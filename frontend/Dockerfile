# react build production
FROM node:14-alpine as frontend_build

WORKDIR /frontend

COPY package*.json ./
COPY ./src ./src/
COPY webpack.config.js ./

# RUN npm install
RUN npm ci --loglevel verbose
RUN npm run build

# server environment
FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=frontend_build /frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
