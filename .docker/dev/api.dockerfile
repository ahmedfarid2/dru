ARG NODE_VERSION=20.15.0
ARG APP_PATH=apps/api
ARG BASE_PATH=/usr/src/app

# NodeJS as base
FROM node:${NODE_VERSION}-alpine AS base
ARG APP_PATH
ARG BASE_PATH

# Install dependencies
FROM base AS deps

WORKDIR ${BASE_PATH}
COPY package.json package-lock.json ./
RUN npm install

# Copy source code & dependencies
FROM base AS api

WORKDIR ${BASE_PATH}

COPY --from=deps ${BASE_PATH}/node_modules ./node_modules
COPY . ./

EXPOSE 3001

CMD ["npx", "nx", "serve", "api"]
