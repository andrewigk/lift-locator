# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app
EXPOSE 5173

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev


FROM base AS dev

COPY . .
CMD npm run dev

FROM base AS build
COPY . .
RUN npm run build

FROM node:${NODE_VERSION}-alpine AS prod
WORKDIR /user/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

RUN npm install -g serve

# Copy build output from the previous stage
COPY --from=build /usr/src/app/dist ./dist

COPY . .

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
