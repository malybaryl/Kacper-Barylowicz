export default class Skill {
  constructor(
    name = "JavaScript",
    level = 100,
    projects_releted = [["name", "#link"]]
  ) {
    this.name = name;
    this.level = level;
    this.projects_releted = projects_releted;
  }

  getName() {
    return this.name;
  }

  getLevel() {
    return this.level;
  }

  getProjectsReleted() {
    return this.projects_releted;
  }
}
