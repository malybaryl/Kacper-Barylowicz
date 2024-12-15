import Tile from "./Tile.js";
import JsonHandler from "./JsonHandler.js";

export default class Footer {
  constructor(language = "pl") {
    this.footer = document.querySelector("footer");
    if (this.footer === null) {
      throw new Error("Footer element not found");
    }
    this.tile = new Tile("footer", "");
    this.text = {};
    this.changeLanguage(language);
  }

  async changeLanguage(language = "pl") {
    this.text = await JsonHandler.readJson("static/json/footer.json", language);
    this.tile.generate(this.text.text);
  }
}
