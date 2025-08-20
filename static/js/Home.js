export default class Home {
  constructor(text, showLogs = false) {
    this.text = text;
    this.showLogs = showLogs;
    this.id = "#greeting";
  }

  render() {
    this.greeting = document.querySelector(this.id);
    if (this.greeting === null) {
      console.warn("Greeting not found");
    }
    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log("* Greeting element found");
      console.log("* Greeting element start rendering");
    }
    this.greeting.textContent = this.text;
  }

  changeLanguage(newText) {
    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log(`* New text for greeting: ${newText}`);
    }
    this.greeting.textContent = newText;
  }
}
