import Quote from "./Quote.js";
import JsonHandler from "./JsonHandler.js";
import VideoConverter from "./VideoConverter.js";
import Section from "./Section.js";
import Navigation from "./Navigation.js";
import Home from "./Home.js";
import Skills from "./Skills.js";
import Projects from "./Projects.js";
import Certificates from "./Certificates.js";
import Contact from "./Contact.js";
import Footer from "./Footer.js";

class Main {
  constructor() {
    this.jsonHandler = JsonHandler.getInstance();
    this.videoConverter = VideoConverter.getInstance();
    this.language = localStorage.getItem("siteLanguage") || "pl";
    this.CONFIG_URL = "./static/json/config/config.json";
    this.QUOTES_URL = "./static/json/quotes.json";
    this.navigationUrl = "./static/json/navigation.json";
    this.homeUrl = "./static/json/home.json";
    this.aboutUrl = "./static/json/about-me.json";
    this.educationUrl = "./static/json/education.json";
    this.experienceUrl = "./static/json/experience.json";
    this.skillsUrl = "./static/json/skills.json";
    this.projectsUrl = "./static/json/projects.json";
    this.certificatesUrl = "./static/json/certificates.json";
    this.footerUrl = "./static/json/footer.json";
    this.init();
  }

  async init() {
    try {
      this.config = await this.jsonHandler.readJson(this.CONFIG_URL);
      this.showLogs = !!this.config.showLogs;
      if (this.showLogs) {
        console.log("******** Main.js init started ********");
        console.log("--------------------------------------");
        console.log("* Config loaded successfully");
      }
    } catch (err) {
      console.error("Configuration loading failed:", err);
      this.showLogs = false;
    }

    try {
      const [
        quotesRaw,
        navigationRaw,
        homeRaw,
        aboutMeRaw,
        educationRaw,
        experienceRaw,
        skillsRaw,
        projectsRaw,
        certificatesRaw,
        footerRaw,
      ] = await Promise.all([
        this.jsonHandler.readJson(this.QUOTES_URL),
        this.jsonHandler.readJson(this.navigationUrl),
        this.jsonHandler.readJson(this.homeUrl),
        this.jsonHandler.readJson(this.aboutUrl),
        this.jsonHandler.readJson(this.educationUrl),
        this.jsonHandler.readJson(this.experienceUrl),
        this.jsonHandler.readJson(this.skillsUrl),
        this.jsonHandler.readJson(this.projectsUrl),
        this.jsonHandler.readJson(this.certificatesUrl),
        this.jsonHandler.readJson(this.footerUrl),
      ]);

      this.quotesRaw = quotesRaw || {};
      this.navigationRaw = navigationRaw || {};
      this.homeRaw = homeRaw || {};
      this.aboutMeRaw = aboutMeRaw || {};
      this.educationRaw = educationRaw || {};
      this.experienceRaw = experienceRaw || {};
      this.skillsRaw = skillsRaw || {};
      this.projectsRaw = projectsRaw || {};
      this.certificatesRaw = certificatesRaw || {};
      this.footerRaw = footerRaw || {};

      if (this.showLogs) {
        console.log("--------------------------------------");
        console.log("* All JSON loaded successfully");
      }
    } catch (err) {
      console.error("Data loading failed:", err);
      return;
    }

    if (this.aboutMeRaw.video) {
      this.video = this.videoConverter.convert(
        this.aboutMeRaw.video[this.language]
      );
      if (this.showLogs) {
        console.log("--------------------------------------");
        console.log("* Video converted successfully");
      }
    } else {
      this.video = null;
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
        console.log("* Navigation rendered successfully");
      }
    }

    this.quote = new Quote(
      this.language,
      this.quotesRaw.quotes || [],
      this.showLogs
    );
    this.generateNewQuote();

    this.home = new Home(
      this.homeRaw.greeting?.[this.language] || "",
      this.showLogs
    );
    this.home.render();

    this.aboutMeVideos = this.video ? [this.video] : [];
    this.aboutSection = new Section(
      "about",
      this.aboutMeRaw.sectionName?.[this.language] || "",
      this.aboutMeRaw.about?.[this.language] || "",
      this.aboutMeVideos,
      this.showLogs
    );
    this.aboutSection.render();

    this.educationSection = new Section(
      "education",
      this.educationRaw.sectionName?.[this.language] || "",
      this.educationRaw.education?.[this.language] || "",
      [],
      this.showLogs
    );
    this.educationSection.render();

    this.experienceSection = new Section(
      "experience",
      this.experienceRaw.sectionName?.[this.language] || "",
      this.experienceRaw.experience?.[this.language] || "",
      [],
      this.showLogs
    );
    this.experienceSection.render();

    this.skillsSection = new Skills(
      "skills",
      this.skillsRaw.sectionName?.[this.language] || "",
      this.skillsRaw.skills || [],
      this.showLogs
    );
    this.skillsSection.render();

    this.projectsSection = new Projects(
      this.projectsRaw.projects || [],
      this.navigationRaw.projects || { pl: "Projekty", en: "Projects" },
      this.language,
      this.showLogs
    );
    this.projectsSection.render();

    this.certificatesSection = new Certificates(
      this.certificatesRaw.certificates || [],
      this.navigationRaw.certifications || {
        pl: "Certyfikaty",
        en: "Certificates",
      },
      this.language,
      this.showLogs
    );
    this.certificatesSection.render();

    this.contactSection = new Contact(this.language, this.showLogs);
    this.contactSection.render();

    this.footer = new Footer(
      this.footerRaw || {},
      this.language,
      this.showLogs
    );
    this.footer.render();

    this.initEventListeners();

    if (this.showLogs) {
      console.log("******** Main.js init finished ********");
    }
  }

  renderSkillsSection(sectionName, skills = [], showLogs = false) {
    this.skillsSection = new Skills(
      sectionName,
      this.skillsRaw.sectionName?.[this.language] || "",
      skills,
      this.showLogs
    );
    this.skillsSection.render();
  }

  initEventListeners() {
    const quoteEl = document.querySelector(".quote");
    if (quoteEl) {
      quoteEl.addEventListener("click", () =>
        this.quote.generateNewQuote(this.language, "quote", "author")
      );
    }
    document.addEventListener("app:languageChanged", (e) => {
      this.onLanguageChange(e.detail.lang);
    });
  }

  generateNewQuote() {
    this.quote.generateNewQuote(this.language, "quote", "author");
  }

  onLanguageChange(lang) {
    this.language = lang;
    localStorage.setItem("siteLanguage", lang);
    this.home.changeLanguage(this.homeRaw.greeting?.[lang] || "");
    this.aboutSection.translateSection(
      this.aboutMeRaw.sectionName?.[lang] || "",
      this.aboutMeRaw.about?.[lang] || ""
    );
    this.educationSection.translateSection(
      this.educationRaw.sectionName?.[lang] || "",
      this.educationRaw.education?.[lang] || ""
    );
    this.quote.translateQuote(lang);
    this.experienceSection.translateSection(
      this.experienceRaw.sectionName?.[lang] || "",
      this.experienceRaw.experience?.[lang] || ""
    );
    this.skillsSection.translateSection(
      this.skillsRaw.sectionName?.[lang] || ""
    );
    this.projectsSection.translateSection(lang);
    this.certificatesSection.translateSection(lang);
    this.contactSection.translateSection(lang);
    this.footer.translateSection(lang);
    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log("* Language changed to:", lang);
    }
  }
}

new Main();
