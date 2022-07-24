const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: Object.keys(Intents.FLAGS)
});

const cnf = JSON.parse(process.env.CONFIG);

const commands = require('./src/commands');
const listeners = require('./src/event');

const tmpReply = require('./src/lib/tmpReply');

client.on('ready', () => console.log('Ready!'));

listeners.forEach((listener) => {
    client.on(listener, require(`./src/event/${listener}`));
});

client.on('messageCreate', (message) => {
    if (message.content.startsWith(cnf.prefix) && message.author !== client.user) {
        const args = message.content.split(' ');
        const cmd = args[0].replace(cnf.prefix, '');
        if (commands.list.includes(cmd)) {
            const cmdres = require(commands.cmdPos[commands.list.indexOf(cmd)]);
            if (args.length >= cmdres.minArgs && args.length <= cmdres.maxArgs) {
                cmdres.exec(message, client);
            } else {
                tmpReply(message, cmdres.help, 3000);
            }
        } else {
            tmpReply(message, cnf.notCmd);
        }
    }
});

client.on('error', async (err) => {
    (await client.channels.fetch(cnf.logCh)).send({embeds: [new MessageEmbed({
        title: 'エラーが発生しました',
        color: 'RED',
        description: err,
        timestamp: new Date()
    })]});
});

process.on('uncaughtException', async (err) => {
    (await client.channels.fetch(cnf.logCh)).send({embeds: [new MessageEmbed({
        title: 'エラーが発生しました',
        color: 'RED',
        description: err,
        timestamp: new Date()
    })]});
});

process.on('unhandledRejection', async (reason) => {
    (await client.channels.fetch(cnf.logCh)).send({embeds: [new MessageEmbed({
        title: 'Promiseでエラーが発生しました',
        color: 'ORANGE',
        description: reason,
        timestamp: new Date()
    })]});
});

client.login().then(() => console.log('Logged in!')).catch(console.error);