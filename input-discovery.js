const fs = require('fs').promises;
const path = require('path');

async function discover(dir) {
    const items = await fs.readdir(dir);
    const files = items .filter(async f => (await fs.stat(f)).isFile());
    const json = files.filter(f => f.endsWith('.json') &&
        !['config.json', 'package.json'].includes(f));
    if (json.length !== 0) {
        return { type: 'json', path: path.resolve(dir, json[0]) };
    }
    console.log('Cannot discover json file input. Use html file input as fallback.');
    const html = files.filter(f => f.endsWith('.html'))
    if (html.length !== 0) {
        return { type: 'html', path: path.resolve(dir, html[0]) };
    }
    console.log('Cannot discover html file input');
    throw new Error('There is no input file');
}

module.exports = discover;
