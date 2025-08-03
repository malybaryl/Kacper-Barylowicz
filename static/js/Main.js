import Quote from "./Quote.js";
import JsonHandler from "./JsonHandler.js";
import VideoConverter from "./VideoConverter.js";
import Section from "./Section.js";

class Main {
  constructor() {
    this.jsonHandler = JsonHandler.getInstance();
    this.videoConverter = VideoConverter.getInstance();
    this.language = "pl";
    this.CONFIG_URL = "./static/json/config/config.json";
    this.QUOTES_URL = "./static/json/quotes.json";
    this.init();
  }
  async init() {
    try {
      // Load configuration
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
      // Load quotes
      this.quotesRaw = await this.jsonHandler.readJson(
        "./static/json/quotes.json"
      );

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

    // load about me json
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

    // Initialize Videos of about me
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

    // *Initialize Quote instance*
    this.generateNewQuote();

    // *Render sections*
    // About Section
    this.aboutMeVideos = [this.video];
    this.aboutSection = new Section(
      "about",
      this.aboutMeRaw.sectionName[this.language],
      this.aboutMeRaw.about[this.language],
      this.aboutMeVideos,
      this.showLogs
    ).render();
    // Education Section
    this.educationSection = new Section(
      "education",
      this.educationRaw.sectionName[this.language],
      this.educationRaw.education[this.language],
      [],
      this.showLogs
    ).render();
  }

  initEventListeners() {
    document
      .querySelector(".quote")
      .addEventListener("click", () => this.quote.generateNewQuote());
  }
  generateNewQuote() {
    this.quote = new Quote(this.language, this.quotesRaw.quotes, this.showLogs);
    this.quote.generateNewQuote(this.language, "quote", "author");
  }
}
new Main();
