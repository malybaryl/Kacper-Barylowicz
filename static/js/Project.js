export default class Project {
  constructor(
    title = "title",
    id = "#id",
    hashtags = [],
    startDate = "2004",
    lastUpdate = "2024",
    links = [],
    description = "description",
    Technologies = [],
    additionalText = "",
    images = []
  ) {
    this.title = title;
    this.id = id;
    this.hashtags = hashtags;
    this.startDate = startDate;
    this.lastUpdate = lastUpdate;
    this.links = links;
    this.description = description;
    this.Technologies = Technologies;
    this.additionalText = additionalText;
    this.images = images;
  }

  getTitle() {
    return this.title;
  }

  getId() {
    return this.id;
  }

  getHashtags() {
    return this.hashtags;
  }

  getLinks() {
    return this.links;
  }

  getStartDate() {
    return this.startDate;
  }

  getLastUpdate() {
    return this.lastUpdate;
  }

  getDescription() {
    return this.description;
  }

  getTechnologies() {
    return this.Technologies;
  }

  getAdditionalText() {
    return this.additionalText;
  }

  getImages() {
    return this.images;
  }
}
