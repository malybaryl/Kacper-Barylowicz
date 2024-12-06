export default class Header {
    constructor(language = 'pl', languagesList = ['pl', 'en']) {
        try {
            this.#generate(language, languagesList);
        } catch (error) {
            console.error(error);
        }
    }

    #generate(language = 'pl', languagesList = ['pl', 'en']){
         if (!languagesList.includes(language)) {
            throw new Error(`Language '${language}' is not supported. Supported languages: ${languagesList.join(', ')}`);
        }
    
        this.language = language;
        this.text = {};
    
        fetch('static/json/header.json')
            .then(response => response.json())
            .then(translations => {
                this.text = Object.keys(translations).reduce((acc, key) => {
                    acc[key] = translations[key][this.language];
                    return acc;
                }, {});
    
                console.log("Loaded translations:", this.text);
    
                this.#generateHero();
                this.#genarateLanguage();
            })
            .catch(error => console.error("Error loading translations:", error));
        
        this.header = document.querySelector('#header');
        if (this.header === null) {
            throw new Error('Header element not found');
        }
    }
    
    changeLanguage(language = 'en'){
        this.language = language;
        fetch('static/json/header.json')
            .then(response => response.json())
            .then(translations => {
                this.text = Object.keys(translations).reduce((acc, key) => {
                    acc[key] = translations[key][this.language];
                    return acc;
                }, {});
    
                console.log("Loaded translations:", this.text);
    
                this.#changeLanguageHero();
                this.#changeLanguageImage();
            })
            .catch(error => console.error("Error loading translations:", error));
    }
    
    #generateHero() {
        const hero = document.createElement('div');
        hero.classList.add('hero');
        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = this.text.title;
        const subtitle = document.createElement('p');
        subtitle.classList.add('subtitle');
        subtitle.textContent = this.text.subtitle;
        hero.appendChild(title);
        hero.appendChild(subtitle);
        this.header.appendChild(hero);
        return;
    } 

    #changeLanguageHero() {
        const title = document.querySelector('.hero .title');
        title.innerHTML = this.text.title;
        const subtitle = document.querySelector('.hero .subtitle');
        subtitle.innerHTML = this.text.subtitle;
    }

    #genarateLanguage() {
        const language = document.createElement('div');
        language.classList.add('language');
        const img = document.createElement('img');
        img.src = this.text.languageImagePath;
        img.alt = this.text.languageImageAlt;
        language.appendChild(img);
        this.header.appendChild(language);
    }


    #changeLanguageImage() {
        const img = document.querySelector('.language img');
        img.src = this.text.languageImagePath;
        img.alt = this.text.languageImageAlt;
    }
}