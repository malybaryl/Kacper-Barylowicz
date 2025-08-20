export default class Section {
  constructor(id, title, content, videos = [], showLogs = false) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.videos = videos;
    this.showLogs = showLogs;
  }

  render() {
    if (this.showLogs) {
      console.log(`--------------------------------------`);
      console.log(`Rendering section: ${this.id}`);
    }
    const container = document.createElement("div");
    container.className = "container";
    if (this.showLogs) {
      console.log(`Container created for section: ${this.id}`);
    }

    this.heading = document.createElement("h2");
    this.heading.className = "mb-3";
    this.heading.style.paddingBottom = "2rem";
    this.heading.textContent = this.title;
    if (this.showLogs) {
      console.log(`Heading created for section: ${this.id}`);
    }

    this.contentDiv = document.createElement("div");
    this.contentDiv.style.textAlign = "justify";
    this.contentDiv.innerHTML = this.content;
    if (this.showLogs) {
      console.log(`Content div created for section: ${this.id}`);
    }

    container.appendChild(this.heading);
    container.appendChild(this.contentDiv);

    const section = document.querySelector("#" + this.id);
    if (!section) {
      console.error(`Section with id ${this.id} not found in the document.`);
    }

    if (this.videos && this.videos.length > 0) {
      this.videos.forEach((video) => {
        const videoConteiner = video;
        container.appendChild(videoConteiner);
        if (this.showLogs) {
          console.log(`Video added to section: ${this.id}`);
        }
      });
    }

    section.appendChild(container);
    if (this.showLogs) {
      console.log(`Section ${this.id} rendered successfully.`);
    }
  }

  translateSection(newTitle, newContent) {
    if (this.showLogs) {
      console.log(`--------------------------------------`);
      console.log(`Translating section: ${this.id}`);
    }
    this.heading.textContent = newTitle;
    this.contentDiv.innerHTML = newContent;
    if (this.showLogs) {
      console.log(`Section ${this.id} translated successfully.`);
    }
  }
}
