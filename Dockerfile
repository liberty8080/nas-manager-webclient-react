FROM nginx:alpine AS base
WORKDIR /app
EXPOSE 80

FROM node:lts AS build
WORKDIR /src
COPY . .
RUN npm install --global yarn
RUN yarn
RUN yarn build

FROM base AS final
COPY --from=build /src/build /usr/share/nginx/html
