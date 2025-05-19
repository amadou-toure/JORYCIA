#etape 1: build the image
FROM node:20-alpine3.21
WORKDIR /app
COPY . .
RUN yarn && yarn build
EXPOSE 80
CMD ["yarn", "start"]
