const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays songs from YouTube')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('search')
				.setDescription('Search songs from YouTube')
				.addStringOption((option) =>
					option.setName('song name').setDescription('song name').setRequired(true)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('song')
				.setDescription('Loads a single song from a YouTube URL')
				.addStringOption((option) => option.setName('url').setDescription('the song\'s url').setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('playlist')
				.setDescription('Loads a playlist of songs from a YouTube URL')
				.addStringOption((option) => option.setName('url').setDescription('the playlist\'s url').setRequired(true))
		),
	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) return interaction.editReply('You need to be in a VC to use ask kitty chan to sing!');

		const queue = await client.player.createQueue(interaction.guild);
		if (!queue.connection) await queue.connect(interaction.member.voice.channel);

		let embed = new MessageEmbed();

		if (interaction.options.getSubcommand() === 'song') {
			let url = interaction.options.getString('url');
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO
			});
			if (result.tracks.length === 0)
				return interaction.editReply('No results');
            
			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}  -  kitty chan is singing`});

		} else if (interaction.options.getSubcommand() === 'playlist') {
			let url = interaction.options.getString('url');
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST
			});

			if (result.tracks.length === 0)
				return interaction.editReply('No results');
            
			const playlist = result.playlist;
			await queue.addTracks(result.tracks);
			embed
				.setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
				.setThumbnail(playlist.thumbnail);
		} else if (interaction.options.getSubcommand() === 'search') {
			let url = interaction.options.getString('searchterms');
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO
			});

			if (result.tracks.length === 0)
				return interaction.editReply('No results');
            
			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}  -  kitty chan is singing`});
		}
		if (!queue.playing) await queue.play();
		await interaction.editReply({
			embeds: [embed]
		});
	},
};
