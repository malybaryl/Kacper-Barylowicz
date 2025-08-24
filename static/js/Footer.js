export default class Footer {
  constructor(text, language = "pl", showLogs = false, selector = "footer") {
    this.text = text;
    this.language = language;
    this.showLogs = showLogs;
    this.selector = selector;
    this.host = document.querySelector(this.selector);

    if (this.showLogs)
      console.log(`Footer initialized with language=${this.language}`);
  }

  render() {
    if (!this.host) {
      this.host = document.querySelector(this.selector);
      if (!this.host) {
        if (this.showLogs) console.error("Footer: host element not found");
        return;
      }
    }
    const year = new Date().getFullYear();
    const raw = (this.text[this.language] || this.text.pl).replace(
      "{year}",
      year
    );
    this.host.innerHTML = raw;
    if (this.showLogs) console.log("Footer rendered");
  }

  translateSection(language = "pl") {
    this.language = language;
    if (this.showLogs) console.log(`Footer translated to ${language}`);
    this.render();
  }
}
