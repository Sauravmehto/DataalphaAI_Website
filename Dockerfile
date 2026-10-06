# Stage 1: Install all dependencies and build the app
FROM node:24-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at build time.
# Runtime env_file in docker-compose is too late for the Turnstile widget.
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY

RUN npm run build

# Stage 2: Production runtime image
FROM node:24-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built output and static assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "run", "start", "--", "-p", "3000"]
