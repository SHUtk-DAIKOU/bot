const fs = require('fs');
const path = require('path');

let commands = []
let cmdPos = []

const getFiles = (dir) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
        if (dirent.isDirectory()) {
            getFiles(path.join(dir, dirent.name));
        }
        if (dirent.isFile() && dirent.name !== 'index.js') {
            commands.push(path.basename(dirent.name, '.js'));
            cmdPos.push(path.join(dir, path.basename(dirent.name, '.js')));
        }
    });
}

module.exports = { list: commands, cmdPos }
