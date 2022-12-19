const { PermissionsBitField, SlashCommandBuilder, Routes, ActivityType, GatewayIntentBits, Client, Partials} = require('discord.js');
const { REST } = require('@discordjs/rest');
const { token, clientId } = require('./config.json');
const wait = require('node:timers/promises').setTimeout;
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent], partials: [Partials.Channel,Partials.Message] });
const commands = [
	new SlashCommandBuilder().setName('purge')
		.setDescription('Wipes a certain amount of messages')
		.addNumberOption(option => option.setName('number')
			.setDescription('How many messages to send')
			.setRequired(true)
		),

	new SlashCommandBuilder().setName('suggest')
		.setDescription('Sends a suggestion to the creator of the bot')
		.addStringOption(option => option.setName('suggestion')
			.setDescription('Your suggestion')
			.setRequired(true)
		),

	new SlashCommandBuilder().setName('censor')
		.setDescription('Configures censored words')
		.addStringOption(option => option.setName("action")
				.setDescription("Your action.")
				.setRequired(true)
				.addChoices(
					{name: "Add a word", value: "add"},
					{name: "Remove a word", value: "rem"},
					{name: "List blocked words", value: "list"},
				)
		)
		.addStringOption(option => option.setName('word')
			.setDescription('What word you are removing/adding')
		),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

client.once('ready', () => {
	console.log('Bot connected and ready');
	client.user.setActivity('for memes in #general', {type: ActivityType.Watching });

});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName, options } = interaction;

	if (commandName === 'purge') {//clear messages
		const amount = options.getNumber("number");

		if (99<amount|amount<2) {//try to make better later
			await interaction.reply({content:"Amount must be more than 2 and less than 99", ephemeral:true});
			return;
		}

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
			await interaction.reply({content:"You do not have permission to execute this command",ephemeral:true});
			return;
		}

		const msgs = await interaction.channel.messages.fetch({limit:amount});
		await interaction.channel.bulkDelete(msgs);
		await interaction.reply({content:`${amount} messages were deleted`,ephemeral:true});
	}

	if (commandName === 'suggest') {/*suggest things to me*/
		console.log(`Suggestion by ${interaction.user.username}#${interaction.user.discriminator}: `+options.getString("suggestion"));
		await interaction.reply({content:"Your suggestion was received",ephemeral:true});
	}

	if (commandName === 'censor') {/*suggest things to me*/
		const action = options.getString("action");
		const word = options.getString("word")
		if (action === "list") {
			//do later
		}
	}

});

client.on('typingStart', (channel, user) => {
  console.log(`${user.username} is typing in ${channel.name}`)
  console.log(`${user.presence.status}`)
});

/*for censors later
client.on('messageCreate', async message => {
	message.channel.messages.fetch({limit: 20}).then(msgs => {
	});
});
*/

client.login(token);
