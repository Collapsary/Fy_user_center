FROM node:16-alpine
WORKDIR /app
COPY dist ./dist
COPY package*.json ./
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
