# Dockerfile (multi-stage)
FROM node:18-alpine AS builder
WORKDIR /app

# install build deps
COPY package*.json ./
RUN npm ci

# copy app and build
COPY . .
RUN npm run build

# remove dev deps to reduce final size
RUN npm prune --production

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# copy production files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

EXPOSE 3000

# start Next.js server
CMD ["npm", "run", "start"]
