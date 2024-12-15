import JsonHandler from "./JsonHandler.js";

export default class Navigation {
  constructor(language) {
    this.navigation = document.querySelector(".tile-nav");
    this.language = language;
    this.text = {};
    this.#generate();
  }

  async #generate() {
    this.text = await JsonHandler.readJson(
      "static/json/sectionsname.json",
      this.language
    );
    console.log(this.text);
    if (this.text !== null) {
      // #about tile
      try {
        this.generateTile("nav-tile-about", "#about", this.text.about);
      } catch (error) {
        console.error(error);
      }
      // #experience tile
      try {
        this.generateTile(
          "nav-tile-experience",
          "#experience",
          this.text.experience
        );
      } catch (error) {
        console.error(error);
      }
      // #skills tile
      try {
        this.generateTile("nav-tile-skills", "#skills", this.text.skills);
      } catch (error) {
        console.error(error);
      }
      // #projects tile
      try {
        this.generateTile("nav-tile-projects", "#projects", this.text.projects);
      } catch (error) {
        console.error(error);
      }
      // #certificates tile
      try {
        this.generateTile(
          "nav-tile-certificates",
          "#certificates",
          this.text.certificates
        );
      } catch (error) {
        console.error(error);
      }
      // #github tile
      try {
        this.generateTile(
          "nav-tile-github",
          "https://github.com/malybaryl",
          null,
          this.text.github,
          this.text.github_alt
        );
      } catch (error) {
        console.error(error);
      }
      // #linkedin tile
      try {
        this.generateTile(
          "nav-tile-linkedin",
          "https://www.linkedin.com/in/kacperbarylowicz",
          null,
          this.text.linkedin,
          this.text.linkedin_alt
        );
      } catch (error) {
        console.error(error);
      }
      // #discord tile
      try {
        this.generateTile(
          "nav-tile-discord",
          "https://discord.com/invite/Htk2nmbRRK",
          null,
          this.text.discord,
          this.text.discord_alt
        );
      } catch (error) {
        console.error(error);
      }
      // #mail tile
      try {
        this.generateTile(
          "nav-tile-mail",
          "mailto:kacper.barylowicz@outlook.com",
          null,
          null,
          null,
          this.text.mail
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  getText() {
    return this.text;
  }

  generateTile(
    id = "",
    href = "#",
    text = "",
    img = null,
    imgAlt = "",
    icon = null
  ) {
    try {
      const tile = document.createElement("a");
      tile.href = href;
      const tileDiv = document.createElement("div");
      tileDiv.classList.add("tile");
      tileDiv.textContent = text;
      if (img != null) {
        const imgElement = document.createElement("img");
        tileDiv.classList.add("icon-tile");
        imgElement.src = img;
        imgElement.alt = imgAlt;
        tile.target = "_blank";
        tileDiv.appendChild(imgElement);
      } else if (icon) {
        const iconElement = document.createElement("span");
        tileDiv.classList.add("icon-tile");
        iconElement.classList.add("material-symbols-outlined");
        iconElement.textContent = icon;
        tileDiv.appendChild(iconElement);
        tile.id = id;
      } else {
        tileDiv.textContent = text;
      }
      tile.appendChild(tileDiv);
      this.navigation.appendChild(tile);
      tile.id = id;
    } catch (error) {
      console.error(error);
    }
  }

  async changeLanguage(language = "en") {
    this.language = language;
    this.text = await JsonHandler.readJson(
      "static/json/sectionsname.json",
      this.language
    );
    console.log(this.text);
    if (this.text !== null) {
      // #about tile
      try {
        this.changeTile("nav-tile-about", "#about", this.text.about);
      } catch (error) {
        console.error(error);
      }
      // #experience tile
      try {
        this.changeTile(
          "nav-tile-experience",
          "#experience",
          this.text.experience
        );
      } catch (error) {
        console.error(error);
      }
      // #skills tile
      try {
        this.changeTile("nav-tile-skills", "#skills", this.text.skills);
      } catch (error) {
        console.error(error);
      }
      // #projects tile
      try {
        this.changeTile("nav-tile-projects", "#projects", this.text.projects);
      } catch (error) {
        console.error(error);
      }
      // #certificates tile
      try {
        this.changeTile(
          "nav-tile-certificates",
          "#certificates",
          this.text.certificates
        );
      } catch (error) {
        console.error(error);
      }
      // #github tile
      try {
        this.changeTile(
          "nav-tile-github",
          "https://github.com/malybaryl",
          null,
          this.text.github,
          this.text.github_alt
        );
      } catch (error) {
        console.error(error);
      }
      // #linkedin tile
      try {
        this.changeTile(
          "nav-tile-linkedin",
          "https://www.linkedin.com/in/kacperbarylowicz",
          null,
          this.text.linkedin,
          this.text.linkedin_alt
        );
      } catch (error) {
        console.error(error);
      }
      // #discord tile
      try {
        this.changeTile(
          "nav-tile-discord",
          "https://discord.com/invite/Htk2nmbRRK",
          null,
          this.text.discord,
          this.text.discord_alt
        );
      } catch (error) {
        console.error(error);
      }
      // #mail tile
      try {
        this.changeTile(
          "nav-tile-mail",
          "mailto:kacper.barylowicz@outlook.com",
          null,
          null,
          null,
          this.text.mail
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  changeTile(
    id = "",
    href = "#",
    text = null,
    img = null,
    imgAlt = null,
    icon = null
  ) {
    try {
      const tile = document.querySelector("#" + id);
      if (!tile) {
        console.warn(`Tile with ID #${id} was not found in the DOM.`);
        return;
      }
      const tileDiv = tile.querySelector("div");
      if (img != null) {
        const imgElement = tileDiv.querySelector("img");
        imgElement.src = img;
        imgElement.alt = imgAlt;
      } else if (icon) {
        const iconElement = tileDiv.querySelector("span");
        iconElement.textContent = icon;
      } else {
        tileDiv.textContent = text;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
