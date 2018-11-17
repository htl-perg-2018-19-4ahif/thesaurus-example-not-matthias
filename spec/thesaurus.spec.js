const jasmine = require('jasmine');
const cp = require('child_process');

const outNoWords = 'Please specify words.\n';
const outNoDefinition = 'No matches found.\n';
const outOneWord = `Definitions for the word \"Dummy-Variable\":\n    Stellvertreter-Variable\n    Scheinvariable\nDefinitions for the word "Dummy":\n    Puppe\n    Attrappe\n`;
const outTwoWords = `Definitions for the word "Cherrytomate":\n    Kirschtomate\n    Cocktailtomate\nDefinitions for the word "MDF-Platte":\n    mitteldichte Faserplatte\n    mitteldichte Holzfaserplatte\n`;

describe('Thesaurus', () => {
    describe('Negative tests', () => {
        it('No Words', done => {
            cp.exec('node out/thesaurus.js', (err, stdout) => {
                expect(stdout).toBe(outNoWords);
                done();
            });
        });

        it('No Matches Found', done => {
            cp.exec('node out/thesaurus.js Perg', (err, stdout) => {
                expect(stdout).toBe(outNoDefinition);
                done();
            });
        });
    });

    describe('Positive tests', () => {
        it('Single Word, Multiple Matches', done => {
            cp.exec('node out/thesaurus.js Dummy', (err, stdout) => {
                expect(stdout).toBe(outOneWord);
                done();
            });
        });

        it('Multiple Words, Single Match for each Word', done => {
            cp.exec('node out/thesaurus.js Cherrytomate MDF', (err, stdout) => {
                expect(stdout).toBe(outTwoWords);
                done();
            });
        });
    });
});