const { MarkovMachine } = require('./markov');

describe("Markov chain tests", () => {
    const testText = `To be or not to be, that is the question. What is \
        the question? To be or not to be. Sometimes I wonder what the \
        question even is. Can I ask the question? I do not know. Can I be \
        without questioning a question from this world?`
    let testMarkov = new MarkovMachine(testText);


    test("Constructor should create a valid Markov chain with all words", () => {
        let words = [...testMarkov.words];
        words.pop();
        for (let w of words) {
            expect(Object.keys(testMarkov.chains)).toContain(w);
        }
    });

    test("Test getNextWords method", () => {
        expect(testMarkov.getNextWords("not")).toEqual(expect.any(Array));
        expect(testMarkov.getNextWords("not")).toEqual(["to", "to", "know."]);
        expect(testMarkov.getNextWords("to")).toEqual(["be,", "be."]);
        expect(testMarkov.getNextWords("Markov")).toEqual([]);
    });

    test("makeText method should create a valid string and all words should be present in original text", () => {
        let testOutput = testMarkov.makeText(30);
        expect(testOutput).toEqual(expect.any(String));

        let testOutputWords = testOutput.split(" ");
        for (let w of testOutputWords) {
            expect(testMarkov.words).toContain(w);
        }
    })
})