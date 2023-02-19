const Discord = require('discord.js');
const dotenv = require('dotenv');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { Player } = require('discord-player');
const express = require('express');
const app = express();
dotenv.config();
const TOKEN = process.env.TOKEN;

const client = new Discord.Client({
	intents: [
		'GUILDS',
		'GUILD_VOICE_STATES'
	]
});

client.slashcommands = new Discord.Collection();
client.player = new Player(client, {
	ytdlOptions: {
		quality: 'highestaudio',
		highWaterMark: 1 << 25
	}
});

let commands = [];

const slashFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
for (const file of slashFiles){
	const slashcmd = require(`./slash/${file}`);
	client.slashcommands.set(slashcmd.data.name, slashcmd);
	commands.push(slashcmd.data.toJSON());
}


const rest = new REST({ version: '10' }).setToken(
	process.env.KITTY_CHAN_TOKEN
);
   
console.log('Deploying slash commands');
// rest.put(Routes.applicationCommands(process.env.KITTY_CHAN_ID), { body: commands })
// 	.then(() => {
// 		console.log('Successfully loaded');
// 	})
// 	.catch((err) => {
// 		if (err){
// 			console.log(err);
// 		}
// 	});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});
client.on('interactionCreate', (interaction) => {
	async function handleCommand() {
		if (!interaction.isCommand()) return;

		const slashcmd = client.slashcommands.get(interaction.commandName);
		if (!slashcmd) interaction.reply('Not a valid slash command');

		await interaction.deferReply();
		await slashcmd.run({ client, interaction });
	}
	handleCommand();
});
    
client.login(TOKEN);

