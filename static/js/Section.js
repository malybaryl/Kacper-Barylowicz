export default class Section {
  constructor(id, title, content, showLogs = false) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.showLogs = showLogs;
  }

  render() {
    if (this.showLogs) {
      console.log(`--------------------------------------`);
      console.log(`Rendering section: ${this.id}`);
    }
    const container = document.createElement('div');
    container.className = 'container';
    if (this.showLogs) {
      console.log(`Container created for section: ${this.id}`);
    }

    const heading = document.createElement('h2');
    heading.className = 'mb-3';
    heading.textContent = this.title;
    if (this.showLogs) {
      console.log(`Heading created for section: ${this.id}`);
    }

    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = this.content;
    if (this.showLogs) {
      console.log(`Content div created for section: ${this.id}`);
    }

    container.appendChild(heading);
    container.appendChild(contentDiv);

    const section = document.querySelector('#' + this.id);
    if (!section) {
        console.error(`Section with id ${this.id} not found in the document.`);
    }

    section.appendChild(container);
    if (this.showLogs) {
      console.log(`Section ${this.id} rendered successfully.`);
    }

  }
}
