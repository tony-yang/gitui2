FROM node:22-bookworm-slim

RUN npm install -g pnpm@latest-10

ENV NEXT_TELEMETRY_DISABLED=1 \
    PROJECT=gitui2 \
    PORT=3000

WORKDIR /src/$PROJECT

COPY *.json *.yaml *.mjs ./

RUN pnpm i --frozen-lockfile

EXPOSE 3000

COPY public ./public/
COPY *.ts ./
COPY app  ./app/

CMD ["pnpm", "dev"]