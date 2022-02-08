process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const axios = require('axios')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'neta-price') {
      await interaction.reply(await getCoinPrice('neta'))
   } else if (commandName === 'ergopad-price') {
      await interaction.reply(await getCoinPrice('ergopad'))
   }
});

client.login(token);

async function getCoinPrice(coin) {
   return await axios.get('https://ergopad.io/api/asset/price/' + coin)
      .then(res => JSON.stringify(res.data.price))
      .catch(err => console.error(err))
}
