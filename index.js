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
		morse={'/': ' ', '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e', '..-.': 'f', '--.': 'g', '....': 'h', '..': 'i', '.---': 'j', '-.-': 'k', '.-..': 'l', '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p', '--.-': 'q', '.-.': 'r', '...': 's', '-': 't', '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x', '-.--': 'y', '--..': 'z', '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9'};
		symbols={'.-.-.-': '.', '--..--': ',', '-.-.--': '!', '..--..': '?', '---...': ':', '.----.': "'", '.-..-.': '"', '-....-': '-', '.-.-.': '+', '-..-.': '/', '.--.-.': '@', '-...-':'\n', '-.-.-.': ';', '-.-.-':'¡'}
		/* Still Troublesome :(
		I'll deal with = in an even later update (and maybe (SAY AGAIN?) as well)
		Removed the (SAY AGAIN?) prosign because i'd rather have a ? instead
		Moving (SAY AGAIN?) from prosigns to abbreviations*/
		prosigns={'.-.-.':'(OVER)','.-...':'(WAIT)','...-.':'(VERIFIED)','..-.-':'(INTERROGATIVE)','........':'(CORRECTION)','-.-.-':'(ATTENTION)', '...---...':'(EMERGENCY)'}
		let resp = "";
		for (let i=1;i<Object.keys(txt).length;i++) {
			if (morse[txt[i]] !== undefined) {
				resp+=morse[txt[i]];
			}
			else { //Symbols, Prosigns, and Undefined

				if (symbols[txt[i]]==="+" || symbols[txt[i]]==="¡") {
					if (symbols[txt[i]]==="¡") {
						if (i===1) resp+="(ATTENTION)"
						else resp+="¡"
					}
					if (symbols[txt[i]]==="+") {
						if (i===Object.keys(txt).length-1) resp+="(OVER)"
						else resp+="+"
					}
				}
				else if (prosigns[txt[i]] !== undefined) resp+=prosigns[txt[i]] //All other prosigns
				else if (symbols[txt[i]] !== undefined) resp+=symbols[txt[i]] //All other symbols

				else { //Undefined
					resp+="�"
				}

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
