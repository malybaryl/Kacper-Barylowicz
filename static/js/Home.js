export default class Home {
  constructor(text, showLogs = false) {
    this.text = text;
    this.showLogs = showLogs;
    this.id = "#greeting";
  }

  render() {
    const greeting = document.querySelector(this.id);
    if (greeting === null) {
      console.warn("Greeting not found");
    }
    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log("* Greeting element found");
      console.log("* Greeting element start rendering");
    }
    greeting.textContent = this.text;
  }
}
