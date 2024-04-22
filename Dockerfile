FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system my-ecommerce-app && \
    adduser --system -G my-ecommerce-app my-ecommerce-app

RUN npm install -g pnpm

COPY . .

RUN chown -R my-ecommerce-app:my-ecommerce-app .

RUN pnpm install

CMD ["pnpm", "start"]
