
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS prod-deps
RUN npm install --omit=dev


FROM base AS build
RUN npm install
COPY . .
RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /app


COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./


EXPOSE 4173

CMD [ "npm", "run", "preview" ]