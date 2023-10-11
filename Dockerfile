FROM alpine:latest AS build
RUN apk add --update nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY tsconfig.json ./
RUN npm run build

FROM alpine:latest as install
RUN apk add --update nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM alpine:latest
RUN apk add --update nodejs
WORKDIR /app
COPY .env ./
COPY --from=build /app/package.json ./
COPY --from=install /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["node", "./dist/main.js"]
