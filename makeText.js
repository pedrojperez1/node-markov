/** Command-line tool to generate Markov text. */
const axios = require('axios');
const { MarkovMachine } = require('./markov');
const fs = require('fs');

function handleFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("An error occured reading the file: ", err);
            process.kill(1);
        }
        let newMarkov = new MarkovMachine(data);
        console.log(newMarkov.makeText());
    })
}

function handleUrl(url) {
    axios.get(url)
        .then(data => {
            let newMarkov = new MarkovMachine(data.data);
            console.log(newMarkov.makeText());
        })
        .catch(err => {
            throw err
        })
}

switch (process.argv[2]) {
    case "file":
        handleFile(process.argv[3]);
        break;
    case "url":
        handleUrl(process.argv[3]);
        break;
    default:
        console.log("Text source argument is invalid. Exiting...");
        process.kill(1);
}

