FROM node:16-slim
WORKDIR /usr/src/kitty_slash_commands
COPY package.json .
RUN apt-get update || : && apt-get install python -y
RUN apt-get update || : && apt-get install ffmpeg -y
RUN npm config set python3
RUN python -V
RUN npm install
COPY . .
CMD ["node","index.js"]