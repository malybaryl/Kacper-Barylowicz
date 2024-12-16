export default class Certificates {
  constructor(
    description = "description",
    date = "19.02.2004",
    links = [
      ["title", "url"],
      ["title", "url"],
    ],
    images = [
      ["alt", "src"],
      ["alt", "src"],
    ],
    id = "#id"
  ) {
    this.description = description;
    this.date = date;
    this.links = links;
    this.images = images;
    this.id = id;
  }

  getDescription() {
    return this.description;
  }

  getDate() {
    return this.date;
  }

  getLinks() {
    return this.links;
  }

  getImages() {
    return this.images;
  }

  getId() {
    return this.id;
  }

  setDescription(description) {
    this.description = description;
  }

  setDate(date) {
    this.date = date;
  }

  setLinks(links) {
    this.links = links;
  }

  setImages(images) {
    this.images = images;
  }

  update(
    description = "description",
    date = "19.02.2004",
    links = [
      ["title", "url"],
      ["title", "url"],
    ],
    images = [
      ["alt", "src"],
      ["alt", "src"],
    ]
  ) {
    this.setDescription(description);
    this.setDate(date);
    this.setLinks(links);
    this.setImages(images);
  }
}
