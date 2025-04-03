# 使用官方Node.js镜像作为基础镜像(安装依赖)
FROM node:latest as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# 打包
FROM node:latest as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY ./ ./
RUN npm run build

FROM node:latest as runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -g 1001 -S nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --chown=nextjs:nodejs --from=builder /app/.next ./.next
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules/.bin/next next


USER nextjs

EXPOSE 4000

# 启动Next.js应用
CMD ["next", "start"]
