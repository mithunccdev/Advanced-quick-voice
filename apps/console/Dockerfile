# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20.19.0
ARG PNPM_VERSION=9.0.0

FROM node:${NODE_VERSION}-bookworm-slim AS base
ARG PNPM_VERSION
ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./
COPY apps/console/package.json apps/console/package.json
COPY packages/typescript-config packages/typescript-config
COPY packages/eslint-config packages/eslint-config
COPY patches patches
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter console...

FROM deps AS build
COPY apps/console apps/console
WORKDIR /app/apps/console
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=build /app/apps/console/package.json /app/apps/console/package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/console/node_modules ./apps/console/node_modules
COPY --from=build /app/apps/console/public ./apps/console/public
COPY --from=build /app/apps/console/.next ./apps/console/.next

USER nextjs
EXPOSE 3000

WORKDIR /app/apps/console
CMD ["pnpm", "start", "-p", "3000"]
