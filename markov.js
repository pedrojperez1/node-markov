/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    for (let w of this.words) {
      if (chains[w] || w == this.words.slice(-1)[0]) { // skip if we have already seen w or if its last word
        continue
      } else {
        chains[w] = this.getNextWords(w);
      }
    }
    return chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let text = [];
    let candidates;
    while (text.length < numWords) {
      if (text.length == 0) {
        candidates = Object.keys(this.chains).filter(
          word => word[0].toUpperCase() == word[0] // make sure first word is capitalized
        );
        text[0] = candidates[Math.floor(Math.random() * candidates.length)];
      } else {
        candidates = this.chains[text.slice(-1)[0]];
        text.push(candidates[Math.floor(Math.random() * candidates.length)]);
      }
    }
    return text.join(" ");

  }

  getNextWords(word) {
    let nextWords = [];
    for (let i=0; i < this.words.length; i++) {
      if (this.words[i] === word) {
        nextWords.push(this.words[i + 1]);
      }
    }
    return nextWords;
  }

}

module.exports = {
  MarkovMachine
}