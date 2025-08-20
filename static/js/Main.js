import Quote from "./Quote.js";
import JsonHandler from "./JsonHandler.js";
import VideoConverter from "./VideoConverter.js";
import Section from "./Section.js";
import Navigation from "./Navigation.js";
import Home from "./Home.js";

class Main {
  constructor() {
    this.jsonHandler = JsonHandler.getInstance();
    this.videoConverter = VideoConverter.getInstance();
    this.language = localStorage.getItem("siteLanguage") || "pl";
    this.CONFIG_URL = "./static/json/config/config.json";
    this.QUOTES_URL = "./static/json/quotes.json";
    this.init();
  }

  async init() {
    try {
      this.config = await this.jsonHandler.readJson(this.CONFIG_URL);
      this.showLogs = this.config.showLogs;
      if (this.showLogs) {
        console.log("******** Main.js init started ********");
        console.log("--------------------------------------");
        console.log("* Config loaded successfully:");
        console.log("///// showLogs:", this.showLogs);
      }
    } catch (err) {
      console.error("Configuration loading failed:", err);
    }

    try {
      this.quotesRaw = await this.jsonHandler.readJson(this.QUOTES_URL);
      if (
        this.showLogs &&
        this.quotesRaw.quotes &&
        this.quotesRaw.quotes.length > 0
      ) {
        console.log("--------------------------------------");
        console.log("* Quotes loaded successfully:");
        console.log(this.quotesRaw.quotes);
        this.quotesRaw.quotes.forEach((element) => {
          console.log(
            `///// Quote: "${element[0][0]}" ~ ${
              element[1] || "Unknown Author"
            }`
          );
        });
      } else if (this.showLogs) {
        console.log("--------------------------------------");
        console.warn("* No quotes available or failed to load.");
      }
    } catch (err) {
      console.error("Quotes loading failed:", err);
    }

    try {
      this.navigationRaw = await this.jsonHandler.readJson(
        "./static/json/navigation.json"
      );
      if (this.showLogs && this.navigationRaw) {
        console.log("--------------------------------------");
        console.log("* Navigation loaded successfully:");
        console.log("///// Navigation (PL):", this.navigationRaw.pl);
        console.log("///// Navigation (EN):", this.navigationRaw.en);
        console.log("///// ID:", this.navigationRaw.id);
      }
    } catch (err) {
      console.error("Navigation loading failed:", err);
    }

    try {
      this.homeRaw = await this.jsonHandler.readJson("./static/json/home.json");
      if (this.showLogs && this.homeRaw) {
        console.log("--------------------------------------");
        console.log("* Home loaded successfully:");
        console.log("///// Home greeting (PL):", this.homeRaw.pl);
        console.log("///// Home greeting (EN):", this.homeRaw.en);
      }
    } catch (err) {
      console.error("Home loading failed:", err);
    }

    try {
      this.aboutMeRaw = await this.jsonHandler.readJson(
        "./static/json/about-me.json"
      );
      if (this.showLogs && this.aboutMeRaw.about) {
        console.log("--------------------------------------");
        console.log("* About Me loaded successfully:");
        console.log("///// About Me (PL):", this.aboutMeRaw.about.pl);
        console.log("///// About Me (EN):", this.aboutMeRaw.about.en);
      }
    } catch (err) {
      console.error("About Me loading failed:", err);
    }

    try {
      this.educationRaw = await this.jsonHandler.readJson(
        "./static/json/education.json"
      );
      if (this.showLogs && this.educationRaw.education) {
        console.log("--------------------------------------");
        console.log("* Education loaded successfully:");
        console.log("///// Education (PL):", this.educationRaw.education.pl);
        console.log("///// Education (EN):", this.educationRaw.education.en);
      }
    } catch (err) {
      console.error("Education loading failed:", err);
    }

    if (this.aboutMeRaw.video) {
      this.video = this.videoConverter.convert(
        this.aboutMeRaw.video[this.language]
      );
      if (this.showLogs) {
        console.log("--------------------------------------");
        console.log(
          `* Video converted successfully: ${
            this.aboutMeRaw.video[this.language]
          }`
        );
      }
    }

    try {
      this.initEventListeners();
    } catch (err) {
      console.error("Event listeners initialization failed:", err);
    }

    if (this.navigationRaw) {
      this.navigation = new Navigation(
        this.navigationRaw,
        this.language,
        this.showLogs
      );
      this.navigation.render();
      if (this.showLogs) {
        console.log("--------------------------------------");
        console.log("* Navigation rendered successfully.");
      }
    } else {
      console.warn("Navigation data is not available, skipping rendering.");
    }

    this.generateNewQuote();

    this.home = new Home(this.homeRaw.greeting[this.language], this.showLogs);
    this.home.render();

    this.aboutMeVideos = [this.video];
    this.aboutSection = new Section(
      "about",
      this.aboutMeRaw.sectionName[this.language],
      this.aboutMeRaw.about[this.language],
      this.aboutMeVideos,
      this.showLogs
    );
    this.aboutSection.render();

    this.educationSection = new Section(
      "education",
      this.educationRaw.sectionName[this.language],
      this.educationRaw.education[this.language],
      [],
      this.showLogs
    );
    this.educationSection.render();
  }

  initEventListeners() {
    document
      .querySelector(".quote")
      .addEventListener("click", () => this.quote.generateNewQuote());

    document.addEventListener("app:languageChanged", (e) => {
      this.onLanguageChange(e.detail.lang);
    });
  }

  generateNewQuote() {
    this.quote = new Quote(this.language, this.quotesRaw.quotes, this.showLogs);
    this.quote.generateNewQuote(this.language, "quote", "author");
  }

  onLanguageChange(lang) {
    this.language = lang;
    localStorage.setItem("siteLanguage", lang);
    this.home.changeLanguage(this.homeRaw.greeting[lang]);
    this.aboutSection.translateSection(
      this.aboutMeRaw.sectionName[lang],
      this.aboutMeRaw.about[lang]
    );
    this.educationSection.translateSection(
      this.educationRaw.sectionName[lang],
      this.educationRaw.education[lang]
    );
    this.quote.translateQuote(lang);
    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log("* Language changed to:", lang);
    }
  }
}

new Main();
