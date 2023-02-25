FROM node:16.14

# install python and make
RUN apt-get update && \
	apt-get install -y python3 build-essential && \
	apt-get purge -y --auto-remove


WORKDIR /home/kitty_slash_commands

COPY package*.json ./
RUN npm install
VOLUME [ "/home/slash_commands" ]

COPY . .

ENTRYPOINT [ "npm", "run", "prod" ]
