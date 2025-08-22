export default class Navigation {
  constructor(sections = [], language = "pl", showLogs = false) {
    this.sections = Object.values(sections);
    this.language = language;
    this.showLogs = showLogs;
    this.lightLogoPath = "./static/img/light_logo.svg";
    this.blackLogoPath = "./static/img/black_logo.svg";
    this.flags = {
      pl: "./static/img/polish-flag.svg",
      en: "./static/img/uk-flag.svg",
    };
    this.cvEnPath = "./static/cv/Kacper-Barylowicz-CV-EN.pdf";
    this.cvPlPath = "./static/cv/Kacper-Barylowicz-CV-PL.pdf";
  }

  render() {
    const sectionEl = document.querySelector("#mainNavbar");
    if (!sectionEl) return;

    sectionEl.classList.remove("container");
    sectionEl.classList.add(
      "container-fluid",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "w-100",
      "px-3"
    );

    const navList = document.createElement("ul");
    navList.className = "navbar-nav mb-2 mb-lg-0 tile-nav";
    this.sections.forEach((sec) => {
      const li = document.createElement("li");
      li.className = "nav-item";
      const a = document.createElement("a");
      a.className = "nav-link";
      if (sec.id !== "#cv") {
        a.href = `${sec.id}`;
      } else if (this.language === "pl") {
        a.href = this.cvPlPath;
        a.target = "_blank";
      } else {
        a.href = this.cvEnPath;
        a.target = "_blank";
      }
      if (sec[this.language].includes("{icon:")) {
        if (this.showLogs) {
          console.log("Icon link detected");
        }
        const iconPath = sec[this.language].replace(/^\{icon:(.*)\}$/, "$1");
        if (this.showLogs) {
          console.log("Extracted icon path:", iconPath);
        }
        const img = document.createElement("img");
        img.src = iconPath;
        img.alt = "";
        img.width = 26;
        img.height = 26;
        img.style = "border-radius: 25%";
        a.target = "_blank";
        a.appendChild(img);
      } else {
        a.textContent = sec[this.language] || sec.pl;
      }
      a.setAttribute("data-section-id", sec.id);
      li.appendChild(a);
      navList.appendChild(li);
    });
    sectionEl.appendChild(navList);

    const container = document.createElement("div");
    container.className = "d-flex align-items-center ms-auto gap-3";

    const fontContainer = document.createElement("div");
    fontContainer.className = "btn-group me-2";
    fontContainer.role = "group";
    fontContainer.ariaLabel = "Font size";

    const buttonFontSmall = document.createElement("button");
    buttonFontSmall.type = "button";
    buttonFontSmall.className = "btn btn-outline-secondary btn-sm";
    buttonFontSmall.id = "fontSmall";
    buttonFontSmall.textContent = "A";

    const buttonFontNormal = document.createElement("button");
    buttonFontNormal.type = "button";
    buttonFontNormal.className = "btn btn-outline-secondary btn-sm active";
    buttonFontNormal.id = "fontNormal";
    buttonFontNormal.textContent = "A";

    const buttonFontBig = document.createElement("button");
    buttonFontBig.type = "button";
    buttonFontBig.className = "btn btn-outline-secondary btn-sm";
    buttonFontBig.id = "fontLarge";
    buttonFontBig.textContent = "A";

    fontContainer.appendChild(buttonFontSmall);
    fontContainer.appendChild(buttonFontNormal);
    fontContainer.appendChild(buttonFontBig);
    container.appendChild(fontContainer);

    const langDropdown = document.createElement("div");
    langDropdown.className = "dropdown";

    const langBtn = document.createElement("button");
    langBtn.className =
      "btn btn-outline-secondary btn-sm dropdown-toggle d-flex align-items-center gap-1";
    langBtn.type = "button";
    langBtn.id = "languageDropdown";
    langBtn.setAttribute("data-bs-toggle", "dropdown");
    langBtn.setAttribute("aria-expanded", "false");

    const langImg = document.createElement("img");
    langImg.id = "currentLangFlag";
    langImg.src = this.flags[this.language] || this.flags.pl;
    langImg.alt = this.language.toUpperCase();
    langImg.width = 18;
    langImg.height = 12;

    const langText = document.createElement("span");
    langText.id = "currentLangCode";
    langText.textContent = this.language.toUpperCase();

    langBtn.appendChild(langImg);
    langBtn.appendChild(langText);

    const langMenu = document.createElement("ul");
    langMenu.className = "dropdown-menu dropdown-menu-end";
    langMenu.setAttribute("aria-labelledby", "languageDropdown");

    [
      { code: "pl", name: "Polski", flag: this.flags.pl },
      { code: "en", name: "English", flag: this.flags.en },
    ].forEach(({ code, name, flag }) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.className = "dropdown-item d-flex align-items-center gap-2";
      btn.type = "button";
      btn.dataset.lang = code;

      const img = document.createElement("img");
      img.src = flag;
      img.alt = `${name} flag`;
      img.width = 18;
      img.height = 12;

      const span = document.createElement("span");
      span.textContent = name;

      btn.appendChild(img);
      btn.appendChild(span);
      li.appendChild(btn);
      langMenu.appendChild(li);

      btn.addEventListener("click", () => this.applyLanguage(code));
    });

    langDropdown.appendChild(langBtn);
    langDropdown.appendChild(langMenu);
    container.appendChild(langDropdown);

    const themeSwitchContainer = document.createElement("div");
    themeSwitchContainer.className = "form-check form-switch mb-0";

    const inputThemeSwitch = document.createElement("input");
    inputThemeSwitch.className = "form-check-input";
    inputThemeSwitch.type = "checkbox";
    inputThemeSwitch.id = "themeSwitch";

    const labelThemeSwich = document.createElement("label");
    labelThemeSwich.className = "form-check-label";
    labelThemeSwich.for = "themeSwitch";
    labelThemeSwich.id = "themeLabel";
    labelThemeSwich.textContent = "☀️";

    themeSwitchContainer.appendChild(inputThemeSwitch);
    themeSwitchContainer.appendChild(labelThemeSwich);
    container.appendChild(themeSwitchContainer);

    sectionEl.appendChild(container);

    this.handleThemeSwitcher();
    this.handleFontSwitcher();
  }

  applyLanguage(lang) {
    this.language = lang;
    localStorage.setItem("siteLanguage", lang);

    const flagImg = document.getElementById("currentLangFlag");
    const codeSpan = document.getElementById("currentLangCode");
    if (flagImg) flagImg.src = this.flags[lang] || this.flags.pl;
    if (codeSpan) codeSpan.textContent = lang.toUpperCase();

    document.querySelectorAll("a.nav-link[data-section-id]").forEach((a) => {
      const id = a.getAttribute("data-section-id");
      const def = this.sections.find((s) => s.id === id);
      if (def[lang].includes("{icon:") === false) {
        if (def) a.textContent = def[lang] || def.pl || def.en || "";
      }
    });

    const cvLink = document.querySelector("a.nav-link[data-section-id='cv']");
    if (cvLink) {
      cvLink.href = lang === "pl" ? this.cvPlPath : this.cvEnPath;
      cvLink.target = "_blank";
    }

    if (this.showLogs) {
      console.log(`Language changed to: ${lang}`);
    }

    document.dispatchEvent(
      new CustomEvent("app:languageChanged", { detail: { lang } })
    );
  }

  handleThemeSwitcher() {
    const themeSwitch = document.getElementById("themeSwitch");
    const themeLabel = document.getElementById("themeLabel");
    const htmlTag = document.documentElement;
    const logo = document.getElementById("logo-img");

    themeSwitch.addEventListener("change", () => {
      if (themeSwitch.checked) {
        htmlTag.setAttribute("data-bs-theme", "dark");
        themeLabel.textContent = "🌙";
        if (logo) logo.src = this.blackLogoPath;
      } else {
        htmlTag.setAttribute("data-bs-theme", "light");
        themeLabel.textContent = "☀️";
        if (logo) logo.src = this.lightLogoPath;
      }
    });
  }

  handleFontSwitcher() {
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
