const fs = require('fs/promises');
const {lstatSync} = require('fs');
const yargs = require('yargs');
const inquirer = require('inquirer');
const path = require('path');

let currentDirectory = process.cwd();
const options = yargs
    .positional('d', {
        describe: 'Путь до директории',
        default: process.cwd(),
    })
    .positional('p', {
        describe: 'Pattern',
        default: '',
    }).argv;
console.log(options);

class ListItem {
    constructor(path, fileName) {
        this.path = path;
        this.fileName = fileName;
    }

    get isDir() {
        return lstatSync(this.path).isDirectory();
    }
}

const run = async () => {
    const list = await fs.readdir(currentDirectory);
    const items = list.map(fileName =>
        new ListItem(path.join(currentDirectory, fileName), fileName));

    const item = await inquirer
        .prompt([
            {
                name: 'fileName',
                type: 'list',
                message: `Choose: ${currentDirectory}`,
                choices: items.map(item => ({name: item.fileName, value: item})),
            }
        ])
        .then(answer => answer.fileName);

        if (item.isDir) {
            currentDirectory = item.path;
            return await run();
        } else {
            const data = await fs.readFile(item.path, 'utf-8');

            if (!options.p) console.log(data);
            else {
                const regExp  = new RegExp(options.p, 'igm');
                console.log(data.match(regExp).length);
            }
        }
}

run();
