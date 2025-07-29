export default class JsonHandler {
  static #instance;
  static getInstance() {
    if (!JsonHandler.#instance) JsonHandler.#instance = new JsonHandler();
    return JsonHandler.#instance;
  }
  async readJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Błąd ładowania JSON!");
    return await res.json();
  }
}
