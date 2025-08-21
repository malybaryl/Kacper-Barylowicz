import Section from "./Section.js";

export default class Skills extends Section {
  constructor(id, sectionName, skills = [], showLogs = false) {
    super(id, sectionName, undefined, [], showLogs);
    this.content = skills;
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

    if (this.showLogs) {
      console.log("Sorting skills by percentage");
    }

    this.content.sort((a, b) => b[1] - a[1]);
    if (this.showLogs) {
      console.log(`Sorted skills: ${this.content}`);
    }

    this.contentDiv = document.createElement("div");
    this.contentDiv.style.textAlign = "justify";

    const row = document.createElement("div");
    row.className = "row g-3";

    const col1 = document.createElement("div");
    col1.className = "col-md-6";
    const col2 = document.createElement("div");
    col2.className = "col-md-6";

    const listGroup1 = document.createElement("ul");
    listGroup1.className = "list-group";
    const listGroup2 = document.createElement("ul");
    listGroup2.className = "list-group";

    this.content.forEach((skill, index) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = skill[0];
      const badge = document.createElement("span");
      badge.className = `badge ms-2 ${this.getBadgeClass(skill[1])}`;
      badge.textContent = `${skill[1]}%`;
      listItem.appendChild(badge);

      if (index < Math.ceil(this.content.length / 2)) {
        listGroup1.appendChild(listItem);
      } else {
        listGroup2.appendChild(listItem);
      }
    });

    col1.appendChild(listGroup1);
    col2.appendChild(listGroup2);
    row.appendChild(col1);
    row.appendChild(col2);

    this.contentDiv.appendChild(row);

    container.appendChild(this.heading);
    container.appendChild(this.contentDiv);

    const section = document.querySelector("#" + this.id);
    if (!section) {
      console.error(`Section with id ${this.id} not found in the document.`);
    }

    section.appendChild(container);

    if (this.showLogs) {
      console.log(`Section ${this.id} rendered successfully.`);
    }
  }

  getBadgeClass(percentage) {
    if (percentage >= 90) return "bg-success";
    if (percentage >= 70) return "bg-info";
    if (percentage >= 50) return "bg-secondary";
    if (percentage >= 25) return "bg-warning";
    return "bg-danger";
  }

  translateSection(newTitle) {
    if (this.showLogs) {
      console.log(`--------------------------------------`);
      console.log(`Translating section: ${this.id}`);
    }
    this.heading.textContent = newTitle;
    if (this.showLogs) {
      console.log(`Section ${this.id} translated successfully.`);
    }
  }
}
