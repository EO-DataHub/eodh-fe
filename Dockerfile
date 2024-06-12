# stage 1

FROM node:16-alpine AS builder

WORKDIR /app
COPY . .
RUN apk update && apk add --no-cache nodejs npm
RUN npm i
RUN npm run build:prod
# stage 2

FROM nginx:1.21-alpine AS starter

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]