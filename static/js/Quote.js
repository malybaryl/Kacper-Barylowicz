export default class Quote {
    constructor() {
        this.quotes = [
            [
                ["Inwestowanie w wiedzę, zawsze przynosi największe zyski.","An investment in knowledge pays the best."],
                ["Benjamin Franklin"]
            ]    
        ];
        this.data = [null,null];
        this.generateNewQuote();
    }

    generateNewQuote(quoteHtmlClass = 'quote', authorHtmlClass = 'author') {
        this.getQuote();
        this.#saveQuote(quoteHtmlClass, authorHtmlClass);
    }

    getQuote(language = 'pl') {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
           
        if (language === 'pl') {
            this.data[0] = this.quotes[randomIndex][0][0];
            this.data[1] = this.quotes[randomIndex][1];
        } else {    // if (language === 'en')
            this.data[0] = this.quotes[randomIndex][0][1];
            this.data[1] = this.quotes[randomIndex][1];
        } 
    }

    displayQuote() {
        if (this.data) {
            console.log(`"${this.data[0]}" ~ ${this.data[1] || '~ Unknown Author'}`);
        } else {
            console.log('No quote available');
        }
    }

    #saveQuote(quoteHtmlClass = 'quote', authorHtmlClass = 'author') {
        let quote = document.querySelector(`.${quoteHtmlClass}`);
        let author = document.querySelector(`.${authorHtmlClass}`);
        quote.textContent = this.data[0];
        author.textContent = this.data[1] ? `~ ${this.data[1]}` : "~ Nieznany autor";
    }
}
