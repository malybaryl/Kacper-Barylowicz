export default class LanguageHandler {
  constructor(language = "pl") {
    this.language = language;
  }
  getLanguage() {
    return this.language;
  }
  setLanguage(language) {
    this.language = language;
  }
  getLanguageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("lang") || "pl";
  }

  setLanguageInLocalStorage(language) {
    localStorage.setItem("language", language);
  }

  getLanguageFromLocalStorage() {
    return localStorage.getItem("language") || "pl";
  }
}
