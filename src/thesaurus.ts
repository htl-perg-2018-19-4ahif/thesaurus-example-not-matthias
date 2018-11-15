const fs = require('fs');
var LineByLineReader = require('line-by-line');

const thesaurus = 'ressources/OpenThesaurus-Textversion/openthesaurus.txt';



const findDefinition = async (word: string) => {
    new Promise(resolve => {
        const file = new LineByLineReader(thesaurus);
        let definitions: any = {};
        let test = "";

        file.on('line', function (line: string) {
            // Ignore comments
            if (line.trim().indexOf('#') === 0) return;

            const synonymArray = line.split(";");
            const lowerCaseWord = word.toLowerCase();
            let keyword: string[];

            // Check if the string contains the word
            if ((keyword = line.split(";").filter(e => e.toLowerCase().indexOf(lowerCaseWord) !== -1))) {
                if (keyword[0]) {
                    const filteredDefinitions = synonymArray.filter(e => e.toLowerCase() !== keyword[0].toLowerCase());

                    // Add it to the object
                    test += keyword[0];
                    definitions[keyword[0]] = {
                        definition: filteredDefinitions
                    };

                    // console.log(`Synonyms for the word \"${keyword[0]}\": \n ${filteredDefinitions}\n`);
                }
            }
        });

        console.log(definitions);
        console.log(test);
        resolve(definitions);
    });
};


// Interactive mode
if (process.argv.length === 3 && process.argv[2] === '-i') {
    console.log('Interactive mode.');
} else
    // Normal mode
    if (process.argv.length > 2) {
        const words: string[] = process.argv.slice(2);

        for (const word of words) {
            findDefinition(word).then(console.log);

            // Print it

        }
    } else {
        console.log('Please specify words.');
    }