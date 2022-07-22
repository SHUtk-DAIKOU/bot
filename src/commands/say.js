module.exports = (command, client) => {
    return command.channel.send(command.content.split(' ').slice(1).join(' '));
}