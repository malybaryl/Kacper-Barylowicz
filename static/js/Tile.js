export default class Tile {
  constructor(id = "#", text = "") {
    this.section = document.querySelector(id);
    if (this.section === null) {
      throw new Error("Section element not found");
    }
    try {
      this.generate(text);
    } catch (error) {
      console.error(error);
    }
  }

  generate(text) {
    this.section.innerHTML = text;
  }
}
