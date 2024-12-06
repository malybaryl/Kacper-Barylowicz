import Quote from "./Quote.js";
import Header from "./Header.js";


class Main {
    constructor() {
        /*
        
            languages: polish = 'pl', english = 'en'
        
        */
        this.language_list = ['pl', 'en'];
        this.language_index = 0;
        this.language = this.language_list[this.language_index];
        /* 
            Generate page
                    
        */
        
        this.quote = new Quote();
        this.quote.getQuote(this.language);
        this.header = new Header(this.language, this.language_list);


        // lisisteners
        this.#changeLanguageListener();
    }

    #changeLanguage() {
        this.header.changeLanguage(this.language);
        this.quote.translateQuote(this.language);
    }

    #changeLanguageListener() {
        document.addEventListener('DOMContentLoaded', () => {
            const header = document.querySelector('#header');
            if (header) {
                header.addEventListener('click', (event) => {
                    const imgElement = event.target.closest('.language img');
                    if (imgElement) {
                        this.language_index += 1;
                        if (this.language_index >= this.language_list.length) {
                            this.language_index = 0;
                        }
                        this.language = this.language_list[this.language_index];
                        this.#changeLanguage();
                    }
                });
            } else {
                console.error('Header element not found');
            }
        });
    }
}

const main = new Main();
