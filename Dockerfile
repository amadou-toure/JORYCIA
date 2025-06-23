#etape 1: build the image
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN yarn && yarn build
#etape 2: serve 
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/
RUN apk update && apk add tzdata
ENV TZ=America/Toronto
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]