### Stage 1: Prepare
FROM node:16-alpine
WORKDIR /app
ARG PNPM_VERSION=6.31.0
RUN npm install -g pnpm@${PNPM_VERSION}

COPY package.json ./
RUN pnpm install
COPY . .
RUN npm run build

### Stage 2: Runtime
FROM node:16-alpine
WORKDIR /app

COPY --from=0 /app/dist ./

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "entry.js"]
