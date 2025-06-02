#etape 1: build the image
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN yarn && yarn build
#etape 2: serve 
FROM node:20-alpine
WORKDIR /app
RUN yarn global add vite
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/vite.config.ts ./vite.config.ts
EXPOSE 4173
WORKDIR /app
CMD ["vite", "preview", "--port", "4173", "--strictPort", "--host", "0.0.0.0"]
