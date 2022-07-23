module.exports = (command, client) => {
    const args = require('../lib/args')(command.content);
    return command.channel.send(args.join(' '));
}
