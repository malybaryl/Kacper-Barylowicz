export default class JsonHandler {
  constructor() {}

  static async readJson(path = "", language = "pl") {
    try {
      const response = await fetch(path);
      const translations = await response.json();
      const text = Object.keys(translations).reduce((acc, key) => {
        acc[key] = translations[key][language];
        return acc;
      }, {});
      console.log("Loaded translations:", text);
      return text;
    } catch (error) {
      console.error("Error loading translations:", error);
      return null;
    }
  }
}
