import Skill from "./Skill.js";

export default class SkillHandler {
  constructor() {
    this.skillsList = [];
    this.skillSection = document.querySelector("#skills");
    if (this.skillSection === null) {
      throw new Error("Skill section element not found");
    }
  }

  initialize() {
    this.skillsList = [];
    this.addSkill("Python", 98, [
      ["Recrawler, ", "#recrawler"],
      ["Snake, ", "#snake"],
      ["QR-Code-Generator, ", "#qr-code-generator"],
      [
        "Miles-to-Kilometers",
        "#miles-to-kilometers-simple-desktop-application",
      ],
    ]);
    this.addSkill("Git", 98, []);
    this.addSkill("Microsoft Office", 90, []);
    this.addSkill("HTML", 88, []);
    this.addSkill("CSS", 70, []);
    this.addSkill("JavaScript", 70, [["Windy-Weather", "#windy-weather"]]);
    this.addSkill("C++", 80, [
      [
        "Rejestr-Zarejestrowanych-Pojazdów, ",
        "#rejestr-zarejestrownych-pojazdow",
      ],
      ["St-Nicholas-Day-Drawing-Program", "#st-nicholas-day-drawing-program"],
    ]);
    this.addSkill("Linux", 50, []);
    this.addSkill("SQL", 50, []);
    this.addSkill("MySQL", 50, []);
    this.addSkill("NoSQL", 33, []);
    this.addSkill("ORM", 50, []);
    this.addSkill("ERD", 50, []);
    this.addSkill("DLL", 50, []);
    this.addSkill("PostgreSQL", 50, []);
    this.addSkill("C#", 25, [["The-Recursive-Robot", "#the-recursive-robot"]]);
    this.addSkill("Java", 20, []);
    this.addSkill("GDScript", 25, [
      ["Evolution-Conquer", "#evolution-conquer"],
    ]);
    this.addSkill("Kotlin", 10, []);
    this.addSkill("Swift", 10, []);
  }

  addSkill(
    name = "JavaScript",
    level = 100,
    projects_releted = [["name", "#link"]]
  ) {
    const skill = new Skill(name, level, projects_releted);
    this.skillsList.push(skill);
    this.#addSkillToHtml(skill);
  }

  #addSkillToHtml(skill) {
    try {
      let divLinks = null;

      // prepare data and initialize
      const div = document.createElement("div");
      div.classList.add("skill-bar");
      const pTitle = document.createElement("p");
      pTitle.textContent = skill.getName();
      const divLevel = document.createElement("div");
      divLevel.classList.add("progress");
      divLevel.style.width = skill.getLevel() + "%";
      let pProjects;
      if (skill.getProjectsReleted().length > 0) {
        pProjects = document.createElement("p");
        pProjects.classList.add("progress-bar-projects");
        pProjects.textContent = "Projects:";
        divLinks = document.createElement("div");
        divLinks.classList.add("skill-bar-links");
        for (let i = 0; i < skill.getProjectsReleted().length; i++) {
          const a = document.createElement("a");
          a.href = skill.getProjectsReleted()[i][1];
          a.textContent = skill.getProjectsReleted()[i][0];
          divLinks.appendChild(a);
        }
      }

      // adding to html
      div.appendChild(pTitle);
      div.appendChild(divLevel);
      if (skill.getProjectsReleted().length > 0) {
        div.appendChild(pProjects);
        div.appendChild(divLinks);
      }
      this.skillSection.appendChild(div);
    } catch (error) {
      console.error(error);
    }
  }
}
