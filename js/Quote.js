export default class Quote {
    constructor() {
        this.data = null;
        this.generateNewQuote();
    }

    generateNewQuote() {
        this.getQuote().then(() => {
            this.displayQuote();
        });
    }

    async getQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.data = await response.json();
        } catch (error) {
            console.error('Error fetching the quote:', error);
        }
    }

    displayQuote() {
        if (this.data) {
            console.log(`"${this.data.content}" - ${this.data.author || 'Unknown Author'}`);
        } else {
            console.log('No quote available');
        }
    }

    #saveQuote(quoteHtmlClass = 'quote', authorHtmlClass = 'author') {
        let quote = document.getElementsByClassName(quoteHtmlClass)[0];
        let author = document.getElementsByClassName(authorHtmlClass)[0];
        quote.textContent = this.data.content;
        author.textContent = this.data.author ? `- ${this.data.author}` : "- Nieznany autor";
    }
}
