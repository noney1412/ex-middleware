FROM node:current-alpine

WORKDIR /extend/services/app

RUN npm -g install pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

CMD pnpm build && pnpm start
