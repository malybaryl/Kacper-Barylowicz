import Quote from "./Quote.js";
import Header from "./Header.js";
import Navigation from "./Navigation.js";
import TileManager from "./TileManager.js";
import Footer from "./Footer.js";

class Main {
  constructor() {
    /*
        
            languages: polish = 'pl', english = 'en'
        
        */
    this.language_list = ["pl", "en"];
    this.language_index = 0;
    this.language = this.language_list[this.language_index];
    /* 
            Generate page
                    
        */

    this.quote = new Quote();
    this.quote.getQuote(this.language);
    this.header = new Header(this.language, this.language_list);
    this.navigation = new Navigation(this.language);
    this.TileManager = new TileManager(this.language);
    this.Footer = new Footer(this.language);

    // lisisteners
    this.#changeLanguageListener();
  }

  #changeLanguage() {
    this.header.changeLanguage(this.language);
    this.quote.translateQuote(this.language);
    this.navigation.changeLanguage(this.language);
    this.TileManager.changeLanguage(this.language);
    this.Footer.changeLanguage(this.language);
  }

  #changeLanguageListener() {
    document.addEventListener("DOMContentLoaded", () => {
      const header = document.querySelector("#header");
      if (header) {
        header.addEventListener("click", (event) => {
          const imgElement = event.target.closest(".language img");
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
        console.error("Header element not found");
      }
    });
  }
}

const main = new Main();
