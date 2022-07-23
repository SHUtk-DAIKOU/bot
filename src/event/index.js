const fs = require('fs');
const path = require('path');

let listeners = []

fs.readdirSync(__dirname, {withFileTypes: true}).forEach((dirent) => {
    if (dirent.isFile() && dirent.name !== 'index.js') {
        listeners.push(path.basename(dirent.name, '.js'));
    }
});

module.exports = listeners
