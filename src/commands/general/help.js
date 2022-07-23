const fs = require('fs');
const path = require('path');
const { Formatters } = require('discord.js');
module.exports = {
    exec: (command, client) => {
        const args = require('../../lib/args')(command.content);
        const tmpReply = require('../../lib/tmpReply');
        const { list, cmdPos } = require('../index');
        const getCommands = (category) => {
            let cmds = []
            let helps = []
            fs.readdirSync(`../${category}`, { withFileTypes: true }).forEach((dirent) => {
                if (dirent.isFile()) {
                    cmds.push(dirent.name);
                    const cmd = require(path.join(`../${category}`, dirent.name));
                    helps.push(cmd.help);
                }
            });
        }
        const getCategorys = () => {
            let res = []
            fs.readdirSync(path.dirname(__dirname), { withFileTypes: true }).forEach((dirent) => {
                if (dirent.isDirectory()) {
                    res.push(dirent.name);
                }
            });
            return res
        }
        if (args.length === 1) {
            if (list.includes(args[0])) {
                const cmd = require(cmdPos[list.indexOf(args[0])]);
                command.reply(`${args[0]}のヘルプ: ${Formatters.inlineCode(cmd.help)}`);
            } else {
                tmpReply(command, 'そのコマンドは見つかりませんでした')
            }
        } else {
            
        }
    },
    help: '使い方: `help (コマンド)`\nコマンドのヘルプを表示します\nヘルプを表示するコマンドを指定することもできます',
    minArgs: 1,
    maxArgs: 2
}