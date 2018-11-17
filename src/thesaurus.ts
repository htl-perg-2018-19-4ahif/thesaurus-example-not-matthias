const fs = require('fs');
const readline = require('readline');
const LineByLineReader = require('line-by-line');

const thesaurus = 'ressources/OpenThesaurus-Textversion/openthesaurus.txt';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


/**
 * Searches the specified keyword in the thesaurus
 * @param word the keyword to search in the thesaurus
 */
const findDefinition = async (word: string) => {
    new Promise(resolve => {
        const file = new LineByLineReader(thesaurus);
        let definitions: any = {};

        file.on('line', function (line: string) {
            // Ignore comments
            if (line.trim().indexOf('#') === 0) return;

            const definitionArray = line.split(";");
            const lowerCaseWord = word.toLowerCase();
            let keyword: string[];

            // Check if the string contains the word
            if ((keyword = line.split(";").filter(lineWord => lineWord.toLowerCase().indexOf(lowerCaseWord) !== -1)) && keyword[0]) {
                const filteredDefinitions = definitionArray.filter(definition => definition.toLowerCase() !== keyword[0].toLowerCase());

                // Add it to the object
                definitions[keyword[0]] = {
                    definition: filteredDefinitions
                };

                // Print it
                console.log(`Definitions for the word \"${keyword[0]}\": `);
                filteredDefinitions.forEach(definition => console.log(`    ${definition}`));
                console.log();
            }
        });

        resolve(definitions);
    });
};


// Interactive mode
if (process.argv.length === 3 && process.argv[2] === '-i') {
    // Print without newline
    process.stdout.write("Search defintion for the word: ");
    rl.on('line', (line: any) => {
        if (line === "\\q")
            process.exit();

        findDefinition(line);
        process.stdout.write("Search defintion for the word: ");
    });
} else
    // Normal mode
    if (process.argv.length > 2) {
        const words: string[] = process.argv.slice(2);

        for (const word of words) {
            findDefinition(word).then(console.log);

            // TODO: Print it here
        }
    } else {
        console.log('Please specify words.');
    }