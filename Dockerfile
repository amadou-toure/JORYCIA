#etape 1: build the image
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
COPY vite.config.* tsconfig.json ./
COPY public ./public
COPY src ./src

RUN yarn && yarn build
#etape 2: serve 
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]