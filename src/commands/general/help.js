const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');
module.exports = {
    exec: (command, client) => {
        const args = require('../../lib/args')(command.content);
        const tmpReply = require('../../lib/tmpReply');
        const embedPage = require('../../lib/embedPage');

        const { list, cmdPos } = require('../index');
        const createHelpEmbeds = () => {
            let categorys = []
            fs.readdirSync(path.dirname(__dirname), { withFileTypes: true }).forEach((dirent) => {
                if (dirent.isDirectory()) {
                    categorys.push(dirent.name);
                }
            });

            let res = []

            categorys.forEach((category) => {
                let fields = []
                fs.readdirSync(`../${category}`, { withFileTypes: true }).forEach((dirent) => {
                    if (dirent.isFile()) {
                        fields.push({ name: dirent.name, value: cmd.help });
                    }
                });
                res.push(new MessageEmbed({
                    title: category,
                    fields,
                    color: 'YELLOW',
                }));
                return res
            });
        }
        if (args.length === 1) {
            if (list.includes(args[0])) {
                const cmd = require(cmdPos[list.indexOf(args[0])]);
                return command.reply(`${args[0]}のヘルプ: \n${cmd.help}`);
            } else {
                tmpReply(command, 'そのコマンドは見つかりませんでした')
            }
        } else {
            embedPage(command.reply, createHelpEmbeds());
        }
    },
    help: '使い方: `help (コマンド)`\nコマンドのヘルプを表示します\nヘルプを表示するコマンドを指定することもできます',
    minArgs: 1,
    maxArgs: 2
}