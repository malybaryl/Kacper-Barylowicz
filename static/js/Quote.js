export default class Quote {
    constructor() {
        this.quotes = [
            [
                ["Inwestowanie w wiedzę, zawsze przynosi największe zyski.","An investment in knowledge pays the best."],
                ["Benjamin Franklin"]
            ],
            [
                ["Nie musisz być wielki by zacząć, ale musisz zacząć by być wielkim.","You don't have to be great to start, but you have to start to be great."],
                ["Les Brown"]
            ],
            [
                ["Jedyną drogą do wykonania dobrej pracy jest kochanie tego co się robi.", "The only way to do great work is to love what you do."],
                ["Steve Jobs"]
            ],
            [
                ["Błędy są dowodem na to, że próbujesz.", "Mistakes are proof that you are trying."]
            ],
            [
                ["Nie ma rzeczy niemożliwych, są tylko ludzie, którzy zbyt szybko rezygnują.", "There are no impossible things, only people who give up too soon."],
                ['Adam Ostrowski, "Brzydki, zły i szczery"']
            ],
            [
                ["W informatyce zawsze uczymy się czegoś nowego, bo każda linijka kodu może nas nauczyć więcej niż cała książka.", "In computer science, we are always learning something new, because every line of code can teach us more than an entire book."]
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
