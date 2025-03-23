export default class Home {
  constructor() {
    this.home = document.querySelector(".home");

    this.meImagePath = "static/img/me.jpg";
    this.meImageAlt = "Kacper Baryłowicz";

    this.imageQuetationMarkPath = "static/img/quotation-mark.png";
    this.imageQuetationMarkAlt = "Quote";

    this.lightLogoPath = "static/img/light_logo.svg";
    this.logoAlt = "Logo";

    if (this.home === null) {
      throw new Error("Home element not found");
    }
    try {
      this.#generate();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Generates the home view.
   * Creates the following elements:
   * - `#me-and-quote-div` containing:
   *   - `#me` containing an `<img>` of the author
   *   - `#quote-div` containing:
   *     - `#quotation-mark-left`
   *     - `<p class="quote">` for the quote
   *     - `<p class="author">` for the author
   *     - `#quotation-mark-right`
   * - `nav.tile-nav` for the navigation tiles
   *
   * @returns {void}
   */
  async #generate() {
    const mainDiv = document.createElement("div");
    mainDiv.id = "me-and-quote-div";
    this.home.appendChild(mainDiv);

    const aLogo = document.createElement("a");
    aLogo.id = "a-logo";
    console.log(aLogo.id);
    aLogo.href = "#";
    const logo = document.createElement("img");
    logo.id = "logo";
    logo.src = this.lightLogoPath;
    logo.alt = this.logoAlt;
    aLogo.appendChild(logo);

    const me = document.createElement("div");
    me.id = "me";
    mainDiv.appendChild(me);

    const imageOfMe = document.createElement("img");
    imageOfMe.src = this.meImagePath;
    imageOfMe.alt = this.meImageAlt;
    me.appendChild(imageOfMe);

    const quoteDiv = document.createElement("div");
    quoteDiv.id = "quote-div";
    mainDiv.appendChild(quoteDiv);

    const imageQuetationMarkLeft = document.createElement("img");
    imageQuetationMarkLeft.id = "quotation-mark-left";
    imageQuetationMarkLeft.classList.add("quotation-mark");
    imageQuetationMarkLeft.src = this.imageQuetationMarkPath;
    imageQuetationMarkLeft.alt = this.imageQuetationMarkAlt;
    quoteDiv.appendChild(imageQuetationMarkLeft);

    const quote = document.createElement("p");
    quote.classList.add("quote");
    quoteDiv.appendChild(quote);

    const author = document.createElement("p");
    author.classList.add("author");
    quoteDiv.appendChild(author);

    const imageQuetationMarkRight = document.createElement("img");
    imageQuetationMarkRight.id = "quotation-mark-right";
    imageQuetationMarkRight.classList.add("quotation-mark");
    imageQuetationMarkRight.src = this.imageQuetationMarkPath;
    imageQuetationMarkRight.alt = this.imageQuetationMarkAlt;
    quoteDiv.appendChild(imageQuetationMarkRight);

    const tileNav = document.createElement("nav");
    tileNav.classList.add("tile-nav");
    this.home.appendChild(tileNav);
    tileNav.appendChild(aLogo);
  }

  #generateLanguage() {
    console.log(this.text);
    const language = document.createElement("div");
    language.classList.add("language");
    const img = document.createElement("img");
    img.src = this.text.languageImagePath;
    img.alt = this.text.languageImageAlt;
    language.appendChild(img);
    this.home.appendChild(language);
  }
}
