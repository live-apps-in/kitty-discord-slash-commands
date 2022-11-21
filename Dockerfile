FROM node:16-alpine
WORKDIR /usr/src/kitty_slash_commands
COPY package.json .
RUN npm install
COPY . .
CMD ["node","index.js"]