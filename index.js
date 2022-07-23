const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: Object.keys(Intents.FLAGS)
});

const prefix = 'o!'
const commandNotFound = "コマンドが見つかりません"
const commands = require('./src/commands');
const listeners = require('./src/event');

const tmpReply = require('./src/lib/tmpReply');

client.on('ready', () => console.log('Ready!'));

listeners.forEach((listener) => {
    client.on(listener, require(`./src/event/${listener}`));
});

client.on('messageCreate', (message) => {
    if (message.content.startsWith(prefix)) {
        const args = message.content.split(' ');
        const cmd = args[0].replace(prefix, '');
        if (commands.list.includes(cmd)) {
            const cmdres = require(commands.cmdPos[commands.list.indexOf(cmd)]);
            if (args.length >= cmdres.minArgs && args.length <= cmdres.maxArgs) {
                cmdres.exec(message, client);
            } else {
                tmpReply(message, cmdres.help, 3000);
            }
        }
    } else {
        tmpReply(message, commandNotFound);
    }
});

client.login().then(() => console.log('Logged in!')).catch(console.error);