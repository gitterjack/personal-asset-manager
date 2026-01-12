# Use Node.js as base image
FROM node:20-alpine

WORKDIR /app

COPY client/package.json client/package-lock.json ./client/
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build

COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm install --production
COPY server ./server

WORKDIR /app/server
EXPOSE 3001

VOLUME ["/app/server/data"]

ENV NODE_ENV=production
ENV PORT=3001
ENV DB_PATH=/app/server/data/assets.db

CMD ["node", "index.js"]
