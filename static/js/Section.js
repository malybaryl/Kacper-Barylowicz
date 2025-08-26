export default class Section {
  constructor(id, title, content, videos = [], showLogs = false) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.videos = videos;
    this.videoNodes = [];
    this.showLogs = showLogs;
    this.container = null;
    this.heading = null;
    this.contentDiv = null;
  }

  render() {
    if (this.showLogs) {
      console.log(`--------------------------------------`);
      console.log(`Rendering section: ${this.id}`);
    }
    const container = document.createElement("div");
    container.className = "container";

    this.heading = document.createElement("h2");
    this.heading.className = "mb-3";
    this.heading.style.paddingBottom = "2rem";
    this.heading.textContent = this.title;

    this.contentDiv = document.createElement("div");
    this.contentDiv.style.textAlign = "justify";
    this.contentDiv.innerHTML = this.content;

    container.appendChild(this.heading);
    container.appendChild(this.contentDiv);

    const section = document.querySelector("#" + this.id);
    if (!section) {
      console.error(`Section with id ${this.id} not found in the document.`);
      return;
    }

    this.videoNodes = [];
    if (this.videos && this.videos.length > 0) {
      this.videos.forEach((video) => {
        const node = video;
        this.videoNodes.push(node);
        container.appendChild(node);
        if (this.showLogs) {
          console.log(`Video added to section: ${this.id}`);
        }
      });
    }

    section.appendChild(container);
    this.container = container;
    if (this.showLogs) {
      console.log(`Section ${this.id} rendered successfully.`);
    }
  }

  translateSection(newTitle, newContent, newVideos) {
    if (this.showLogs) {
      console.log(`--------------------------------------`);
      console.log(`Translating section: ${this.id}`);
    }
    if (this.heading) this.heading.textContent = newTitle;
    if (this.contentDiv) this.contentDiv.innerHTML = newContent;
    if (newVideos) {
      if (this.videoNodes && this.videoNodes.length > 0) {
        this.videoNodes.forEach((n) => n.remove());
      }
      this.videos = newVideos;
      this.videoNodes = [];
      newVideos.forEach((node) => {
        this.container.appendChild(node);
        this.videoNodes.push(node);
      });
      if (this.showLogs) {
        console.log(`Videos updated for section: ${this.id}`);
      }
    }
    if (this.showLogs) {
      console.log(`Section ${this.id} translated successfully.`);
    }
  }
}
