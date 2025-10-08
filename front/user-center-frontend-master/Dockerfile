FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g serve
COPY dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
