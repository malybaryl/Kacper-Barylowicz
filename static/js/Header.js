import JsonHandler from "./JsonHandler.js";

export default class Header {
  constructor(language = "pl", languagesList = ["pl", "en"]) {
    this.header = document.querySelector("#header");
    if (this.header === null) {
      throw new Error("Header element not found");
    }
    try {
      this.#generate(language, languagesList);
    } catch (error) {
      console.error(error);
    }
  }

  async #generate(language = "pl", languagesList = ["pl", "en"]) {
    if (!languagesList.includes(language)) {
      throw new Error(
        `Language '${language}' is not supported. Supported languages: ${languagesList.join(
          ", "
        )}`
      );
    }

    this.language = language;
    this.text = {};

    this.text = await JsonHandler.readJson(
      "static/json/header.json",
      this.language
    );
    "static/json/header.json", this.language;

    if (this.text !== null) {
      this.#generateHero();
      this.#generateLanguage();
    }
  }

  async changeLanguage(language = "en") {
    this.language = language;

    this.text = await JsonHandler.readJson(
      "static/json/header.json",
      this.language
    );
    "static/json/header.json", this.language;

    if (this.text !== null) {
      this.#changeLanguageHero();
      this.#changeLanguageImage();
    }
  }

  #generateHero() {
    const hero = document.createElement("div");
    hero.classList.add("hero");
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = this.text.title;
    const subtitle = document.createElement("p");
    subtitle.classList.add("subtitle");
    subtitle.textContent = this.text.subtitle;
    hero.appendChild(title);
    hero.appendChild(subtitle);
    this.header.appendChild(hero);
    return;
  }

  #changeLanguageHero() {
    const title = document.querySelector(".hero .title");
    title.innerHTML = this.text.title;
    const subtitle = document.querySelector(".hero .subtitle");
    subtitle.innerHTML = this.text.subtitle;
  }

  #generateLanguage() {
    const language = document.createElement("div");
    language.classList.add("language");
    const img = document.createElement("img");
    img.src = this.text.languageImagePath;
    img.alt = this.text.languageImageAlt;
    language.appendChild(img);
    this.header.appendChild(language);
  }

  #changeLanguageImage() {
    const img = document.querySelector(".language img");
    img.src = this.text.languageImagePath;
    img.alt = this.text.languageImageAlt;
  }
}
