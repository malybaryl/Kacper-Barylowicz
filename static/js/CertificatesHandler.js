import JsonHandler from "./JsonHandler.js";
import Certificates from "./Certificate.js";

export default class CertificatesHandler {
  constructor(language = "pl") {
    this.certificates = document.querySelector("#certificates");
    if (this.certificates === null) {
      throw new Error("Certificates element not found");
    }
    this.certificatesNavigation = document.querySelector("#certificate-nav");
    if (this.certificatesNavigation === null) {
      throw new Error("Certificates navigation element not found");
    }
    this.text = {};
    this.sectionsName = {};
    this.certificatesArray = [];
  }

  async generate(language = "pl") {
    this.certificatesArray = [];
    await this.#changeLanguage(language);
    try {
      this.addCertificate(
        this.text.tests_python_description,
        this.text.tests_python_date,
        this.text.tests_python_links,
        this.text.tests_python_images,
        this.text.tests_python_id
      );
    } catch (error) {
      console.error(error);
    }
    try {
      this.addCertificate(
        this.text.pygame_description,
        this.text.pygame_date,
        this.text.pygame_links,
        this.text.pygame_images,
        this.text.pygame_id
      );
    } catch (error) {
      console.error(error);
    }
    try {
      this.addCertificate(
        this.text.english_description,
        this.text.english_date,
        this.text.english_links,
        this.text.english_images,
        this.text.english_id
      );
    } catch (error) {
      console.error(error);
    }
    this.#generateHTML();
  }

  #generateHTML() {
    this.certificatesArray.forEach((certificate) => {
      // add to navigation
      let aNavlink = document.createElement("a");
      aNavlink.href = certificate.getId();

      aNavlink.innerHTML = certificate.getDescription();

      this.certificatesNavigation.appendChild(aNavlink);

      // certificate content
      let certificateDiv = document.createElement("div");
      certificateDiv.id = certificate.getId();
      certificateDiv.classList.add("certificate");
      this.certificates.appendChild(certificateDiv);

      let certificateHeader = document.createElement("h2");
      certificateHeader.textContent = certificate.getDescription();
      certificateDiv.appendChild(certificateHeader);

      let certificateDate = document.createElement("p");
      certificateDate.textContent =
        this.sectionsName.complete_date + certificate.getDate();
      certificateDiv.appendChild(certificateDate);

      certificate.getLinks().forEach((link) => {
        let aLink = document.createElement("a");
        aLink.href = link[1];
        if (link[0] === "Udemy") {
          let aImg = document.createElement("img");
          aImg.classList.add("udemy");
          aImg.src = "static/img/udemy.svg";
          aImg.alt = "Udemy";
          aLink.appendChild(aImg);
        } else {
          aLink.textContent = link[0];
        }
        certificateDiv.appendChild(aLink);
      });

      certificate.getImages().forEach((image) => {
        let img = document.createElement("img");
        img.classList.add("certificate-img");
        img.src = image[1];
        img.alt = image[0];
        certificateDiv.appendChild(img);
      });
    });
  }

  async #changeLanguage(language = "pl") {
    this.language = language;
    this.text = await JsonHandler.readJson(
      "static/json/certificates.json",
      this.language
    );
    if (this.text === null) {
      console.error("Error loading translations");
    }
    this.sectionsName = await JsonHandler.readJson(
      "static/json/certificatessections.json",
      this.language
    );
    console.log(this.text);
  }

  addCertificate(description, date, links, images, id) {
    this.certificatesArray.push(
      new Certificates(description, date, links, images, id)
    );
    console.log(this.certificatesArray);
  }
}
