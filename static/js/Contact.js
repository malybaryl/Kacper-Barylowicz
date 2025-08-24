import Section from "./Section.js";

export default class Contact extends Section {
  constructor(language = "pl", showLogs = false) {
    const data = Contact.#getData();
    const title = data[language]?.title || data.pl.title;
    const content = data[language]?.content || data.pl.content;
    if (showLogs) console.log(`Rendering Contact section (${language})`);
    super("contact", title, content, [], showLogs);
  }

  static #getData() {
    return {
      pl: {
        title: "Kontakt",
        content: `
          <p>
            Wypełnij poniższy formularz i wyślij mi wiadomość, albo napisz bezpośrednio na:
            <a href="mailto:kacper.barylowicz@outlook.com">kacper.barylowicz@outlook.com</a>
          </p>
          <form action="https://formsubmit.co/kacper.barylowicz@outlook.com" method="POST" class="row g-3">
            <input type="hidden" name="_subject" value="Wiadomość z portfolio – formularz kontaktowy">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_template" value="table">
            <div class="col-md-6">
              <input type="text" name="name" placeholder="Twoje imię" required class="form-control"/>
            </div>
            <div class="col-md-6">
              <input type="email" name="email" placeholder="Twój email" required class="form-control"/>
            </div>
            <div class="col-12">
              <textarea name="message" placeholder="Twoja wiadomość" required class="form-control" rows="5"></textarea>
            </div>
            <div class="col-12 d-flex gap-2 align-items-center">
              <button type="submit" class="btn btn-primary">Wyślij</button>
            </div>
          </form>
        `,
      },
      en: {
        title: "Contact",
        content: `
          <p>
            Fill out the form below and send me a message, or write directly to:
            <a href="mailto:kacper.barylowicz@outlook.com">kacper.barylowicz@outlook.com</a>
          </p>
          <form action="https://formsubmit.co/kacper.barylowicz@outlook.com" method="POST" class="row g-3">
            <input type="hidden" name="_subject" value="Message from portfolio – contact form">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_template" value="table">
            <div class="col-md-6">
              <input type="text" name="name" placeholder="Your name" required class="form-control"/>
            </div>
            <div class="col-md-6">
              <input type="email" name="email" placeholder="Your email" required class="form-control"/>
            </div>
            <div class="col-12">
              <textarea name="message" placeholder="Your message" required class="form-control" rows="5"></textarea>
            </div>
            <div class="col-12 d-flex gap-2 align-items-center">
              <button type="submit" class="btn btn-primary">Send</button>
            </div>
          </form>
        `,
      },
    };
  }

  translateSection(newLanguage = "pl") {
    const data = Contact.#getData();
    const newTitle = data[newLanguage]?.title || data.pl.title;
    const newContent = data[newLanguage]?.content || data.pl.content;
    super.translateSection(newTitle, newContent);
  }
}
