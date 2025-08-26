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
    const root = document.querySelector("#mainNavbar");
    if (!root) return;

    root.innerHTML = "";
    root.className = "";
    root.setAttribute("role", "navigation");

    const navbar = document.createElement("nav");
    navbar.className = "navbar navbar-expand-lg sticky-top py-2";
    navbar.id = "navbarRoot";

    const container = document.createElement("div");
    container.className = "container-fluid px-3";

    const brand = document.createElement("a");
    brand.className = "navbar-brand d-flex align-items-center gap-2";
    brand.href = "#home";

    const logo = document.createElement("img");
    logo.id = "logo-img";
    logo.src = this.lightLogoPath;
    logo.alt = "Logo";
    logo.height = 28;

    const brandName = document.createElement("span");
    brandName.className = "fw-semibold brand-name";
    brandName.textContent = "Kacper Barylowicz";

    brand.appendChild(logo);
    brand.appendChild(brandName);

    const toggler = document.createElement("button");
    toggler.className = "navbar-toggler";
    toggler.type = "button";
    toggler.setAttribute("data-bs-toggle", "collapse");
    toggler.setAttribute("data-bs-target", "#navCollapse");
    toggler.setAttribute("aria-controls", "navCollapse");
    toggler.setAttribute("aria-expanded", "false");
    toggler.setAttribute("aria-label", "Toggle navigation");

    const togglerIcon = document.createElement("span");
    togglerIcon.className = "navbar-toggler-icon";
    toggler.appendChild(togglerIcon);

    const collapse = document.createElement("div");
    collapse.className = "collapse navbar-collapse";
    collapse.id = "navCollapse";

    const navList = document.createElement("ul");
    navList.className = "navbar-nav me-auto mb-2 mb-lg-0 tile-nav";

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
        a.rel = "noopener";
      } else {
        a.href = this.cvEnPath;
        a.target = "_blank";
        a.rel = "noopener";
      }

      if (sec[this.language] && sec[this.language].includes("{icon:")) {
        const iconPath = sec[this.language].replace(/^\{icon:(.*)\}$/, "$1");
        const img = document.createElement("img");
        img.src = iconPath;
        img.alt = "";
        img.width = 26;
        img.height = 26;
        img.style.borderRadius = "25%";
        a.target = "_blank";
        a.rel = "noopener";
        a.appendChild(img);
      } else {
        a.textContent = sec[this.language] || sec.pl || sec.en || "";
      }

      a.setAttribute("data-section-id", sec.id);
      li.appendChild(a);
      navList.appendChild(li);
    });

    const controls = document.createElement("div");
    controls.className = "d-flex align-items-center gap-2";

    const fontGroup = document.createElement("div");
    fontGroup.className = "btn-group";
    fontGroup.role = "group";
    fontGroup.ariaLabel = "Font size";

    const btnSm = document.createElement("button");
    btnSm.type = "button";
    btnSm.className = "btn btn-outline-secondary btn-sm";
    btnSm.id = "fontSmall";
    btnSm.textContent = "A";

    const btnMd = document.createElement("button");
    btnMd.type = "button";
    btnMd.className = "btn btn-outline-secondary btn-sm active";
    btnMd.id = "fontNormal";
    btnMd.textContent = "A";
    btnMd.style.fontSize = "1.08rem";

    const btnLg = document.createElement("button");
    btnLg.type = "button";
    btnLg.className = "btn btn-outline-secondary btn-sm";
    btnLg.id = "fontLarge";
    btnLg.textContent = "A";
    btnLg.style.fontSize = "1.15rem";

    fontGroup.appendChild(btnSm);
    fontGroup.appendChild(btnMd);
    fontGroup.appendChild(btnLg);

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

    const themeSwitchWrap = document.createElement("div");
    themeSwitchWrap.className = "form-check form-switch mb-0";

    const themeInput = document.createElement("input");
    themeInput.className = "form-check-input";
    themeInput.type = "checkbox";
    themeInput.id = "themeSwitch";

    const themeLabel = document.createElement("label");
    themeLabel.className = "form-check-label";
    themeLabel.htmlFor = "themeSwitch";
    themeLabel.id = "themeLabel";
    themeLabel.textContent = "☀️";

    themeSwitchWrap.appendChild(themeInput);
    themeSwitchWrap.appendChild(themeLabel);

    controls.appendChild(fontGroup);
    controls.appendChild(langDropdown);
    controls.appendChild(themeSwitchWrap);

    collapse.appendChild(navList);
    collapse.appendChild(controls);

    container.appendChild(brand);
    container.appendChild(toggler);
    container.appendChild(collapse);
    navbar.appendChild(container);
    root.appendChild(navbar);

    this.syncNavbarThemeClasses();
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
      if (!def) return;
      if (def[lang] && def[lang].includes("{icon:")) return;
      a.textContent = def[lang] || def.pl || def.en || "";
    });

    const cvLink = document.querySelector("a.nav-link[data-section-id='cv']");
    if (cvLink) {
      cvLink.href = lang === "pl" ? this.cvPlPath : this.cvEnPath;
      cvLink.target = "_blank";
      cvLink.rel = "noopener";
    }

    if (this.showLogs) console.log(`Language changed to: ${lang}`);
    document.dispatchEvent(
      new CustomEvent("app:languageChanged", { detail: { lang } })
    );
  }

  handleThemeSwitcher() {
    const themeSwitch = document.getElementById("themeSwitch");
    const themeLabel = document.getElementById("themeLabel");
    const htmlTag = document.documentElement;
    const logo = document.getElementById("logo-img");

    const apply = (dark) => {
      if (dark) {
        htmlTag.setAttribute("data-bs-theme", "dark");
        themeLabel.textContent = "🌙";
        if (logo) logo.src = this.blackLogoPath;
      } else {
        htmlTag.setAttribute("data-bs-theme", "light");
        themeLabel.textContent = "☀️";
        if (logo) logo.src = this.lightLogoPath;
      }
      this.syncNavbarThemeClasses();
    };

    themeSwitch.addEventListener("change", () => apply(themeSwitch.checked));

    const isDark =
      document.documentElement.getAttribute("data-bs-theme") === "dark";
    themeSwitch.checked = isDark;
    apply(isDark);
  }

  syncNavbarThemeClasses() {
    const navbar = document.getElementById("navbarRoot");
    const isDark =
      document.documentElement.getAttribute("data-bs-theme") === "dark";
    if (!navbar) return;
    navbar.classList.remove(
      "navbar-dark",
      "bg-dark",
      "navbar-light",
      "bg-light"
    );
    if (isDark) {
      navbar.classList.add("navbar-dark", "bg-dark");
    } else {
      navbar.classList.add("navbar-light", "bg-light");
    }
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
