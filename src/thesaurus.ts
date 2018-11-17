const fs = require('fs');
const readline = require('readline');
const LineByLineReader = require('line-by-line');

const thesaurus = 'ressources/OpenThesaurus-Textversion/openthesaurus.txt';

/**
 * Contains the response data for the findDefinition function
 */
class DefinitionResponse {
    public matchFound: boolean = false;
    public definitions: any = {};
}

/**
 * Searches the specified keyword in the thesaurus
 * @param word the keyword to search in the thesaurus
 */
const findDefinition = async (word: string) => {
    return new Promise(resolve => {
        const file = new LineByLineReader(thesaurus);
        let response: DefinitionResponse = new DefinitionResponse();

        file.on('line', function (line: string) {
            if (line.trim().indexOf('#') === 0) return;

            const definitionArray = line.split(';');
            let keyword: string[];

            // Check if the string contains the word
            if ((keyword = definitionArray.filter(lineWord => lineWord.indexOf(word) !== -1)) && keyword[0]) {
                const filteredDefinitions = definitionArray.filter(definition => definition !== keyword[0]);

                response.definitions[keyword[0]] = {
                    definition: filteredDefinitions
                };

                response.matchFound = true;
            }
        });

        file.on("end", function () {
            return resolve(response);
        });
    });
};


// Interactive mode
if (process.argv[2] === '-i') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (line: any) => {
        if (line === '\\q')
            process.exit();

        findDefinition(line).then(console.log);
    });
} else
    // Normal mode
    if (process.argv[2] !== '-i' && process.argv.length > 2) {
        const words: string[] = process.argv.slice(2);

        for (const word of words) {
            findDefinition(word).then(console.log);
        }
    } else {
        console.log('Please specify words.');
    }