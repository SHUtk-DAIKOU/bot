module.exports = {
    exec: async (command, client) => {
        const args = require('../lib/args')(command.content);
        if (args.join(' ').length <= 2000) {
            return command.channel.send(args.join(' '));
        } else {
            const errMsg = await command.reply('文字制限を超える内容のため、実行できません');
            setTimeout(() => errMsg.delete(), 5000);
        }
    }, 
    help: '使い方: `say ...内容`\n内容をボットに発言させます', 
    minArgs: 2,
    maxArgs: Number.MAX_SAFE_INTEGER
}
