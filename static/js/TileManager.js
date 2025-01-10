import JsonHandler from "./JsonHandler.js";
import Tile from "./Tile.js";
import SkillHandler from "./SkillHandler.js";
import ProjectsManager from "./ProjectsManager.js";
import CertificatesHandler from "./CertificatesHandler.js";

export default class TileManager {
  static #instance;

  constructor(language = "pl") {
    if (TileManager.#instance) {
      return TileManager.#instance;
    }
    TileManager.#instance = this;
    this.text = {};
    this.tiles = [];
    this.language = language;
    this.jsonHandler = new JsonHandler();
    this.skillHandler = new SkillHandler();
    this.projectsManager = new ProjectsManager(language);
    this.certificatesHandler = new CertificatesHandler(language);
    this.#fetchTextFromJson("static/json/sectionstext.json", this.language);
  }

  async #fetchTextFromJson(path = "", language = "pl") {
    try {
      this.text = await JsonHandler.readJson(path, language);
      this.#generateTiles();
    } catch (error) {
      console.error("Error loading JSON data:", error);
    }
  }

  async #generateTiles() {
    if (this.text.about) {
      this.addTile("about", "#about", this.text.about);
    } else {
      console.error("Text data for 'about' is missing.");
    }
    if (this.text.education) {
      this.addTile("education", "#education", this.text.education);
    } else {
      console.error("Text education for 'about' is missing.");
    }

    if (this.text.experience) {
      this.addTile("experience", "#experience", this.text.experience);
    } else {
      console.error("Text experience for 'about' is missing.");
    }

    if (this.text.skills) {
      this.addTile("skills", "#skills", this.text.skills);
      this.skillHandler.initialize();
    } else {
      console.error("Text skills for 'about' is missing.");
    }
    if (this.text.projects) {
      this.addTile("projects", "#projects", this.text.projects);
      await this.projectsManager.generate(this.language);
    } else {
      console.error("Text projects for 'about' is missing.");
    }
    if (this.text.certificates) {
      this.addTile("certificates", "#certificates", this.text.certificates);
      this.certificatesHandler.generate(this.language);
    } else {
      console.error("Text certificates for 'about' is missing.");
    }
  }

  addTile(jsonName = "", id = "#", text = "") {
    const tile = new Tile(id, text);
    this.tiles.push([tile, jsonName]);
  }

  async changeLanguage(language = "en") {
    this.language = language;
    await this.#fetchTextFromJson(
      "static/json/sectionstext.json",
      this.language
    );
    let index = 0;
    this.tiles.forEach((tile) => {
      tile.generate(this.text[this.tiles[index][1]]);
      index++;
    });
  }
}
