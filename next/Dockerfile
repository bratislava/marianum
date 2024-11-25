FROM node:18.17-alpine AS base

FROM base AS build-base
WORKDIR /build
COPY ./package.json ./package-lock.json ./

FROM build-base AS install-prod
RUN npm ci --omit-dev --frozen-lockfile

FROM install-prod AS build
COPY --chown=node:node . ./
ENV NEXT_TELEMETRY_DISABLED=1
ENV STRAPI_URL=http://localhost:1337
ENV NEXT_PUBLIC_MEILISEARCH_HOST=http://localhost:7700/
ENV NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY=ffa52c9fc5911ca501e1b8111de7802e61348c4caaccb2a39c0dbf5494538dfc
RUN npm ci --frozen-lockfile \
# rename - for now, compatibility with react 18 is done via new branch with 18 in name,
# remove in future when supported properly
 && mv /build/node_modules/react-18-input-autosize /build/node_modules/react-input-autosize \
 && npm run build

FROM base AS app-base
RUN apk update \
 && apk add --no-cache tini \
 && mkdir -p /home/node/app \
 && chown -R node:node /home/node/app
USER node
WORKDIR /home/node/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
EXPOSE 3000
ARG GIT_COMMIT="undefined"
ENV GIT_COMMIT=$GIT_COMMIT
LABEL org.opencontainers.image.revision="${GIT_COMMIT}" \
      org.opencontainers.image.source="https://github.com/bratislava/marianum.sk" \
      org.opencontainers.image.licenses="EUPL-1.2"
ENTRYPOINT [ "/sbin/tini", "--" ]

FROM app-base AS dev
ENV NODE_ENV=development
COPY --chown=node:node --from=build /build/node_modules ./node_modules
CMD [ "npm", "run", "develop" ]

FROM app-base AS prod
COPY --chown=node:node .env.*.local ./
COPY --chown=node:node --from=build /build/.next/standalone ./
COPY --chown=node:node --from=build /build/public ./public
COPY --chown=node:node --from=build /build/.next/static ./.next/static
CMD [ "node", "server.js" ]
