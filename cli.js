const { string } = require('yargs');
const yargs = require('yargs/yargs');

const app = require('./app.js');

yargs(process.argv.slice(2))
    // the $ 0 will auto match the file name
    // the <> will match up to the .command
    // the [] will match to .options
    .usage('$0: Usage <cmd> [options]')
    .command(
        // command
        'search <artistName>',
        // description
        'search for an artist',
        // builder
        (yargs) => {
            return yargs
                .positional('artistName', {
                    describe: 'Name of the artist to search for: (use underscore for spaces)',
                    type: 'string'
                });
        },
        // handler
        (args) => {
            app.search(args);
        }
    )
    .help().argv;