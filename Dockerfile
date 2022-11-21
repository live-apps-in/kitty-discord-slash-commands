FROM node:16-alpine
WORKDIR /usr/src/kitty_slash_commands
COPY package.json .
RUN npm install node-gyp -g
RUN npm install node-opus
RUN npm install
COPY . .
CMD ["node","index.js"]