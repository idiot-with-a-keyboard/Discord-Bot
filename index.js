const { PermissionsBitField, SlashCommandBuilder, Routes, ActivityType, GatewayIntentBits, Client, Partials} = require('discord.js');
const { REST } = require('@discordjs/rest');
const { token, clientId } = require('./config.json');
const wait = require('node:timers/promises').setTimeout;
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent], partials: [Partials.Channel,Partials.Message] });
commands = [
	new SlashCommandBuilder().setName('help')
		.setDescription('Display morse sheet & how to use'),
] .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

client.once('ready', () => {
	console.log('Bot connected and ready');
	client.user.setActivity('for -- --- .-. ... . / -.-. --- -.. .', {type: ActivityType.Watching });

});

client.on('messageCreate', async message => {
	if (message.author.bot) {
		return;
	}
	if (message.content.includes("-m")) {
		txt=message.content.split(" ");
		morsedict={'-.-.-':'(START OF TRANSMISSION)','..-.-':'(INTERROGATIVE)','..--..':'(SAY AGAIN?)','........': '(CORRECTION)', '/': ' ', '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e', '..-.': 'f', '--.': 'g', '....': 'h', '..': 'i', '.---': 'j', '-.-': 'k', '.-..': 'l', '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p', '--.-': 'q', '.-.': 'r', '...': 's', '-': 't', '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x', '-.--': 'y', '--..': 'z', '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9', '.-.-.-': '.', '--..--': ',', '-.-.--': '!', '..--..': '?', '---...': ':', '.----.': "'", '.-..-.': '"', '-....-': '-', '.-.-.': '+', '-..-.': '/', '.--.-.': '@', '-...-': '\n', '-.-.-.': ';'};
		let resp = "";
		for (let i = 1; i < Object.keys(txt).length; i++) {
			if (morsedict[txt[i]] === undefined) {
				resp += "�"
			}
			else {
				resp+=morsedict[txt[i]];
			}
		}
		message.reply({content: `\`\`\`${message.author.username}#${message.author.discriminator}:\n${resp}\`\`\``, ephemeral: true})}
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName, options } = interaction;

	if (commandName === 'help') {//clear messages
		await interaction.reply({content:'place -m before messages you wish to be auto translated',files: ['morse.png'], ephemeral:true});
	}

	});


client.login(token);
