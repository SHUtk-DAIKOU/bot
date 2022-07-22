const fs = require('fs');
const path = require('path');

let commands = []

fs.readdirSync(__dirname, {withFileTypes: true}).forEach((dirent) => {
    if (dirent.isFile() && dirent.name !== 'index.js') {
        commands.push(path.basename(dirent.name, '.js'));
    }
});

module.exports = commands
