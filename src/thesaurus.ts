const fs = require('fs');
var LineByLineReader = require('line-by-line');



const findDefinition = (word: string): any => {
    const file = new LineByLineReader('ressources/OpenThesaurus-Textversion/openthesaurus.txt');
    let definitions: any = {};

    file.on('line', function (line: string) {
        // Ignore comments
        if (line.trim().indexOf('#') === 0) return;

        const synonymArray = line.split(";");
        const lowerCaseLine = line.toLowerCase();
        const lowerCaseWord = word.toLowerCase();
        let keyword: string[];

        // Check if the string contains the word
        if ((keyword = lowerCaseLine.split(";").filter(e => e.indexOf(lowerCaseWord) !== -1))) {
            if (keyword[0]) {
                const filteredDefinitions = synonymArray.filter(e => e.toLowerCase() !== keyword[0]);

                // Add it to the object
                definitions[keyword[0]] = {
                    definition: filteredDefinitions
                };

                console.log(`Synonyms for the word \"${keyword}\": \n ${filteredDefinitions}\n`);
            }
        }
    });


    file.on('end', function () {
        console.log("end: ");
        console.log(definitions);
        return definitions;
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
            const definitions = findDefinition(word);

            // Print it
            console.log(`Definition found:`);
            console.log(definitions);
        }
    } else {
        console.log('Please specify words.');
    }