export default class Quote {
  constructor(language = "pl", quotesArray = [], showLogs = false) {
    this.language = language;
    this.quotes = quotesArray;
    this.randomIndex = null;
    this.showLogs = showLogs;
    this.data = [];
    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log("Quote instance created with language:", this.language);
    }
  }

  generateNewQuote(
    language = "pl",
    quoteHtmlClass = "quote",
    authorHtmlClass = "author"
  ) {
    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log("Generating new quote...");
    }
    this.getQuote(language);
    if (this.showLogs) {
      console.log("Quote generated successfully.");
    }
    this.#saveQuote(quoteHtmlClass, authorHtmlClass);
  }

  getQuote(language = "pl") {
    if (!this.quotes || this.quotes.length === 0) {
      if (this.showLogs) console.warn("Brak cytatów!");
      return;
    }
    this.randomIndex = Math.floor(Math.random() * this.quotes.length);
    const quoteItem = this.quotes[this.randomIndex];
    const texts = quoteItem[0];
    let author = "Nieznany autor";
    if (typeof quoteItem[1] === "string" && quoteItem[1].length > 0) {
      author = quoteItem[1];
    } else if (Array.isArray(quoteItem[1]) && quoteItem[1].length > 0) {
      author = quoteItem[1][0];
    }
    const quoteText = language === "pl" ? texts[0] : texts[1] || texts[0];
    this.data = [quoteText, author];
    if (this.showLogs) {
      console.log(`Quote selected: "${this.data[0]}" ~ ${this.data[1]}`);
    }
  }

  translateQuote(language = "pl") {
    if (this.randomIndex === null) return;
    const quoteItem = this.quotes[this.randomIndex];
    const texts = quoteItem[0];
    let author = "Nieznany autor";
    if (typeof quoteItem[1] === "string" && quoteItem[1].length > 0) {
      author = quoteItem[1];
    } else if (Array.isArray(quoteItem[1]) && quoteItem[1].length > 0) {
      author = quoteItem[1][0];
    }
    const quoteText = language === "pl" ? texts[0] : texts[1] || texts[0];
    this.data = [quoteText, author];
    this.#saveQuote();
  }

  #saveQuote(quoteHtmlClass = "quote", authorHtmlClass = "author") {
    let quote = document.querySelector(`.${quoteHtmlClass}`);
    let author = document.querySelector(`.${authorHtmlClass}`);
    if (quote && author) {
      quote.textContent = this.data[0];
      author.textContent = this.data[1]
        ? `~ ${this.data[1]}`
        : "~ Nieznany autor";
      if (this.showLogs) {
        console.log("Quote and author updated in the DOM.");
      }
    }
  }
}
