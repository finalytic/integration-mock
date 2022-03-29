### Stage 1: Install
FROM node:16-bullseye-slim
WORKDIR /app
RUN npm install -g pnpm@6.31.0

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY . .
RUN pnpm install -r --offline

RUN npm run build

### Stage 2: Runtime
FROM node:16-bullseye-slim
WORKDIR /app
RUN npm install -g pnpm@6.31.0

COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod

COPY --from=0 /app/dist ./dist
COPY . .
RUN pnpm install -r --offline --prod

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/entry.js"]
