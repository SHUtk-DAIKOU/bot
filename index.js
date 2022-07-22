const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: Object.keys(Intents.FLAGS)
});

const prefix = 'o!'
const commands = require('./src/commands');

client.on('ready', () => console.log('Ready!'));

client.on('messageCreate', (message) => {
    if (message.content.startsWith(prefix)) {
        const cmd = message.content.split(' ')[0].replace(prefix, '');
        if (commands.includes(cmd)) {
            require(`./src/commands/${cmd}`)(message, client);
        }
    }
});

client.login().then(() => console.log('Logged in!')).catch(console.error);