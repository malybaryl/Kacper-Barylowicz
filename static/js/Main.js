import Quote from "./Quote.js";


class Main {
    constructor() {
        const quote = new Quote();
        quote.getQuote();
    }
}

const main = new Main();
