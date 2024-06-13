FROM --platform=linux/amd64 node:18 as build-stage

ARG VUE_APP_ROOT_API
ARG VUE_APP_ALLOWED_HOST

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM --platform=linux/amd64 nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN chmod 0755 /usr/share/nginx/html && chmod 0644 -R /usr/share/nginx/html/*
RUN find /usr/share/nginx/html -type d -exec chmod 0755 {} \;

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/nginx.conf /etc/nginx/nginx.conf