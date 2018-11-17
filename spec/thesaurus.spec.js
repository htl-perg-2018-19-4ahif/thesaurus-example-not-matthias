const jasmine = require('jasmine');
const cp = require('child_process');


const errorMessage = 'Please specify words.\n';
const noDefinitionMessage = 'No matches found.\n';


describe('Normal Converter', () => {
    // Negative tests
    describe('Negative tests', () => {
        it('No Words', done => {
            cp.exec('node out/thesaurus.js', (err, stdout) => {
                expect(stdout).toBe(errorMessage);
                done();
            });
        });

        it('No Matches Found', done => {
            cp.exec('node out/thesaurus.js Perg', (err, stdout) => {
                expect(stdout).toBe(noDefinitionMessage);
                done();
            });
        });
    });

    // Positive tests
    describe('Positive tests', () => {
        
        it('Single Word, Multiple Matches', done => {
            cp.exec('node out/thesaurus.js Rundfenster', (err, stdout) => {
                expect(stdout).toBe(noDefinitionMessage);
                done();
            });
        });

        it('Multiple Words, Single Match for each Word', done => {
            cp.exec('node out/thesaurus.js Rundfenster', (err, stdout) => {
                expect(stdout).toBe(noDefinitionMessage);
                done();
            });
        });
    });
});