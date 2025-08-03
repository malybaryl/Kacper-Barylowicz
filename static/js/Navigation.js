export default class Navigation {
  constructor(sections = [], language = "pl", showLogs = false) {
    this.sections = Object.values(sections);
    this.language = language;
    this.showLogs = showLogs;
    this.lightLogoPath = "./static/img/light_logo.svg";
    this.blackLogoPath = "./static/img/black_logo.svg";
    if (this.sections.length === 0) {
      console.warn("No sections provided for navigation.");
    }

    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log("Navigation instance created with sections:", this.sections);
    }
  }

  render() {
    const section = document.querySelector("#mainNavbar");
    if (!section) {
      console.error("Main navigation section not found in the document.");
      return;
    }
    if (this.showLogs) {
      console.log("Rendering navigation...");
    }
    const navList = document.createElement("ul");
    navList.className = "navbar-nav ms-auto mb-2 mb-lg-0 tile-nav";
    this.sections.forEach((section) => {
      const listItem = document.createElement("li");
      listItem.className = "nav-item";
      const link = document.createElement("a");
      link.className = "nav-link";
      link.href = `#${section.id}`;
      link.textContent = section[this.language] || section.pl;
      listItem.appendChild(link);
      navList.appendChild(listItem);
    });
    section.appendChild(navList);

    // Theme switcher & font size changer container
    const contaier = document.createElement("div");
    contaier.className = "d-flex align-item-center ms-lg-4 gap-2";

    // Font Switcher
    const fontContainer = document.createElement("div");
    fontContainer.className = "btn-group me-2";
    fontContainer.role = "group";
    fontContainer.ariaLabel = "Font size";

    const buttonFontSmall = document.createElement("button");
    buttonFontSmall.type = "button";
    buttonFontSmall.className = "btn btn-outline-secondary btn-sm";
    buttonFontSmall.id = "fontSmall";
    buttonFontSmall.title = "Mała czcionka";
    buttonFontSmall.textContent = "A";

    const buttonFontNormal = document.createElement("button");
    buttonFontNormal.type = "button";
    buttonFontNormal.className = "btn btn-outline-secondary btn-sm active";
    buttonFontNormal.id = "fontNormal";
    buttonFontNormal.title = "Normalna czcionka";
    buttonFontNormal.textContent = "A";

    const buttonFontBig = document.createElement("button");
    buttonFontBig.type = "button";
    buttonFontBig.className = "btn btn-outline-secondary btn-sm";
    buttonFontBig.id = "fontLarge";
    buttonFontBig.title = "Duża czcionka";
    buttonFontBig.textContent = "A";

    fontContainer.appendChild(buttonFontSmall);
    fontContainer.appendChild(buttonFontNormal);
    fontContainer.appendChild(buttonFontBig);
    contaier.appendChild(fontContainer);

    // Theme Switch
    const themeSwitchContainer = document.createElement("div");
    themeSwitchContainer.className = "form-check form-switch mb-0";

    const inputThemeSwitch = document.createElement("input");
    inputThemeSwitch.className = "form-check-input";
    inputThemeSwitch.type = "checkbox";
    inputThemeSwitch.id = "themeSwitch";
    inputThemeSwitch.title = "Przełącz motyw";

    const labelThemeSwich = document.createElement("label");
    labelThemeSwich.className = "form-check-label";
    labelThemeSwich.for = "themeSwitch";
    labelThemeSwich.id = "themeLabel";
    labelThemeSwich.title = "Przełącz motyw";
    labelThemeSwich.textContent = "☀️";

    themeSwitchContainer.appendChild(inputThemeSwitch);
    themeSwitchContainer.appendChild(labelThemeSwich);
    contaier.appendChild(themeSwitchContainer);

    section.appendChild(contaier);

    this.handleThemeSwitcher();
    this.handleFontSwitcher();
  }

  handleThemeSwitcher() {
    // Theme switcher
    const themeSwitch = document.getElementById("themeSwitch");
    const themeLabel = document.getElementById("themeLabel");
    const htmlTag = document.documentElement;

    themeSwitch.addEventListener("change", function () {
      if (this.checked) {
        htmlTag.setAttribute("data-bs-theme", "dark");
        themeLabel.innerHTML = "🌙";
        document.getElementById("logo-img").src = this.blackLogoPath;
      } else {
        htmlTag.setAttribute("data-bs-theme", "light");
        themeLabel.innerHTML = "☀️";
        document.getElementById("logo-img").src = this.lightLogoPath;
      }
    });
  }

  handleFontSwitcher() {
    // Font size switcher
    const btnSmall = document.getElementById("fontSmall");
    const btnNormal = document.getElementById("fontNormal");
    const btnLarge = document.getElementById("fontLarge");
    const bodyTag = document.body;

    function setFont(size) {
      bodyTag.classList.remove("font-small", "font-normal", "font-large");
      btnSmall.classList.remove("active");
      btnNormal.classList.remove("active");
      btnLarge.classList.remove("active");
      if (size === "small") {
        bodyTag.classList.add("font-small");
        btnSmall.classList.add("active");
      } else if (size === "large") {
        bodyTag.classList.add("font-large");
        btnLarge.classList.add("active");
      } else {
        bodyTag.classList.add("font-normal");
        btnNormal.classList.add("active");
      }
    }
    btnSmall.addEventListener("click", () => setFont("small"));
    btnNormal.addEventListener("click", () => setFont("normal"));
    btnLarge.addEventListener("click", () => setFont("large"));
  }
}
