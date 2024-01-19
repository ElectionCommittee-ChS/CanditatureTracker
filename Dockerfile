FROM node:20

WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
WORKDIR /usr/src/app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
WORKDIR /usr/src/app/frontend
RUN npm run build
WORKDIR /usr/src/app/backend
ENV NODE_ENV=production

CMD [ "node", "index.js" ]
