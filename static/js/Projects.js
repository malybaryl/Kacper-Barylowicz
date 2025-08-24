import VideoConverter from "./VideoConverter.js";

export default class Projects {
  constructor(projects, title, language = "pl", showLogs = false) {
    this.originalProjects = Array.isArray(projects) ? projects : [];
    this.projects = [...this.originalProjects];
    this.title = title;
    this.language = language;
    this.showLogs = showLogs;
    this.state = {
      tag: "ALL",
      sort: "last_updated_asc",
      query: "",
    };
    this.text = {
      pl: {
        allTags: "Wszystkie tagi",
        sortBy: "Sortowanie",
        sortOptions: {
          last_updated_desc: "Ostatnia aktualizacja ⟱",
          last_updated_asc: "Ostatnia aktualizacja ⟰",
          title_asc: "Tytuł A–Z",
          title_desc: "Tytuł Z–A",
          start_date_desc: "Najstarszy → Najnowszy ⟱",
          start_date_asc: "Najstarszy → Najnowszy ⟰",
        },
        searchPlaceholder: "Szukaj w projektach...",
        github: "GitHub",
        itch: "itch.io",
        docs: "Dokumentacja",
        docsEn: "Documentation (PL)",
        lastUpdated: "Ostatnia aktualizacja",
        startDate: "Data rozpoczęcia",
        showMore: "Pokaż więcej",
        showLess: "Pokaż mniej",
        video: "Wideo",
        nextImg: "Następne zdjęcie",
        prevImg: "Poprzednie zdjęcie",
        close: "Zamknij",
      },
      en: {
        allTags: "All tags",
        sortBy: "Sort by",
        sortOptions: {
          last_updated_desc: "Last updated ⟱",
          last_updated_asc: "Last updated ⟰",
          title_asc: "Title A–Z",
          title_desc: "Title Z–A",
          start_date_desc: "Start date ⟱",
          start_date_asc: "Start date ⟰",
        },
        searchPlaceholder: "Search projects...",
        github: "GitHub",
        itch: "itch.io",
        docs: "Documentation (PL)",
        docsEn: "Documentation (PL)",
        lastUpdated: "Last updated",
        startDate: "Start date",
        showMore: "Show more",
        showLess: "Show less",
        video: "Video",
        nextImg: "Next image",
        prevImg: "Previous image",
        close: "Close",
      },
    };
  }

  render() {
    this.injectStyles();
    if (this.showLogs) console.log("Rendering Projects section...");
    const section = document.querySelector("#projects");
    if (!section) {
      if (this.showLogs) console.error("Projects section not found!");
      return;
    }
    section.innerHTML = "";
    if (this.showLogs) console.log("Cleared Projects section");

    const container = document.createElement("div");
    container.className = "container";
    const title = document.createElement("h2");
    title.className = "mb-3";
    title.textContent = this.title[this.language];
    container.appendChild(title);
    if (this.showLogs) console.log("Title rendered");

    const controls = this.buildControls();
    container.appendChild(controls);
    if (this.showLogs) console.log("Controls rendered");

    this.listHost = document.createElement("div");
    container.appendChild(this.listHost);
    section.appendChild(container);
    if (this.showLogs) console.log("Container appended to section");

    this.applySortFilterSearch();
  }

  buildControls() {
    if (this.showLogs) console.log("Building controls...");
    const t = this.text[this.language];
    const wrapper = document.createElement("div");
    wrapper.className = "row g-2 align-items-end mb-3";

    const colTag = document.createElement("div");
    colTag.className = "col-12 col-md-4";
    const tagLabel = document.createElement("label");
    tagLabel.className = "form-label";
    tagLabel.textContent = t.allTags;
    const tagSelect = document.createElement("select");
    tagSelect.className = "form-select";
    const tags = this.collectTags();
    if (this.showLogs) console.log("Available tags:", tags);
    const allOpt = document.createElement("option");
    allOpt.value = "ALL";
    allOpt.textContent = t.allTags;
    tagSelect.appendChild(allOpt);
    tags.forEach((tag) => {
      const opt = document.createElement("option");
      opt.value = tag;
      opt.textContent = tag;
      tagSelect.appendChild(opt);
    });
    tagSelect.value = this.state.tag;
    tagSelect.addEventListener("change", () => {
      if (this.showLogs) console.log(`Tag changed to: ${tagSelect.value}`);
      this.state.tag = tagSelect.value;
      this.applySortFilterSearch();
    });
    colTag.appendChild(tagLabel);
    colTag.appendChild(tagSelect);

    const colSort = document.createElement("div");
    colSort.className = "col-12 col-md-4";
    const sortLabel = document.createElement("label");
    sortLabel.className = "form-label";
    sortLabel.textContent = t.sortBy;
    const sortSelect = document.createElement("select");
    sortSelect.className = "form-select";
    const sortOptions = [
      ["last_updated_desc", t.sortOptions.last_updated_desc],
      ["last_updated_asc", t.sortOptions.last_updated_asc],
      ["title_asc", t.sortOptions.title_asc],
      ["title_desc", t.sortOptions.title_desc],
      ["start_date_desc", t.sortOptions.start_date_desc],
      ["start_date_asc", t.sortOptions.start_date_asc],
    ];
    sortOptions.forEach(([val, label]) => {
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = label;
      sortSelect.appendChild(opt);
    });
    sortSelect.value = this.state.sort;
    sortSelect.addEventListener("change", () => {
      if (this.showLogs) console.log(`Sort changed to: ${sortSelect.value}`);
      this.state.sort = sortSelect.value;
      this.applySortFilterSearch();
    });
    colSort.appendChild(sortLabel);
    colSort.appendChild(sortSelect);

    const colSearch = document.createElement("div");
    colSearch.className = "col-12 col-md-4";
    const searchLabel = document.createElement("label");
    searchLabel.className = "form-label";
    searchLabel.textContent = " ";
    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.className = "form-control";
    searchInput.placeholder = t.searchPlaceholder;
    searchInput.value = this.state.query;
    searchInput.addEventListener("input", () => {
      if (this.showLogs) console.log(`Search query: ${searchInput.value}`);
      this.state.query = searchInput.value;
      this.applySortFilterSearch();
    });
    colSearch.appendChild(searchLabel);
    colSearch.appendChild(searchInput);

    wrapper.appendChild(colTag);
    wrapper.appendChild(colSort);
    wrapper.appendChild(colSearch);

    if (this.showLogs) console.log("Controls built");
    return wrapper;
  }

  collectTags() {
    const set = new Set();
    this.originalProjects.forEach((p) => {
      (p.tags || []).forEach((t) => set.add(t));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, this.language));
  }

  applySortFilterSearch() {
    if (this.showLogs) console.log("Applying sort, filter and search...");
    let list = [...this.originalProjects];

    if (this.state.tag !== "ALL") {
      list = list.filter((p) => (p.tags || []).includes(this.state.tag));
      if (this.showLogs) console.log("Filtered by tag:", this.state.tag);
    }

    if (this.state.query && this.state.query.trim() !== "") {
      const q = this.state.query.trim().toLowerCase();
      list = list.filter((p) => {
        const name = (p.name?.[this.language] || "").toLowerCase();
        const brief = (p.brief?.[this.language] || "").toLowerCase();
        const desc = (p.description?.[this.language] || "")
          .replace(/<[^>]*>/g, "")
          .toLowerCase();
        const tags = (p.tags || []).join(" ").toLowerCase();
        const links = Object.values(p.links || {})
          .join(" ")
          .toLowerCase();
        return [name, brief, desc, tags, links].some((s) => s.includes(q));
      });
      if (this.showLogs) console.log("Filtered by search:", this.state.query);
    }

    this.projects = this.sortProjects(list, this.state.sort);
    if (this.showLogs) console.log("Projects ready after filtering");
    this.renderList();
  }

  sortProjects(arr, type) {
    if (this.showLogs) console.log(`Sorting projects by: ${type}`);
    const byDate = (key, dir) => (a, b) =>
      (dir === "desc" ? 1 : -1) *
      (new Date(a[key]).getTime() - new Date(b[key]).getTime());
    const byText = (key, dir) => (a, b) =>
      (dir === "desc" ? -1 : 1) *
      a[key][this.language].localeCompare(b[key][this.language], this.language);
    switch (type) {
      case "last_updated_asc":
        return arr.sort(byDate("last_updated_date", "asc"));
      case "last_updated_desc":
        return arr.sort(byDate("last_updated_date", "desc"));
      case "title_asc":
        return arr.sort(byText("name", "asc"));
      case "title_desc":
        return arr.sort(byText("name", "desc"));
      case "start_date_asc":
        return arr.sort(byDate("start_date", "asc"));
      case "start_date_desc":
        return arr.sort(byDate("start_date", "desc"));
      default:
        return arr.sort(byDate("last_updated_date", "desc"));
    }
  }

  renderList() {
    if (this.showLogs) console.log("Rendering project list...");
    const t = this.text[this.language];
    this.listHost.innerHTML = "";
    this.projects.forEach((project) => {
      if (this.showLogs)
        console.log(`Rendering project: ${project.name[this.language]}`);
      const card = document.createElement("div");
      card.className = "card mb-3";
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      const cardTitle = document.createElement("h3");
      cardTitle.className = "card-title";
      cardTitle.textContent = project.name[this.language];
      cardBody.appendChild(cardTitle);

      (project.tags || []).forEach((tag) => {
        const badge = document.createElement("span");
        badge.className = "badge bg-primary me-1";
        badge.textContent = tag;
        cardBody.appendChild(badge);
      });

      const controlsRow = document.createElement("div");
      controlsRow.className = "mt-2 d-flex flex-wrap gap-2";
      if (project.links?.github) {
        const a = document.createElement("a");
        a.href = project.links.github;
        a.target = "_blank";
        a.className = "btn btn-outline-dark btn-sm";
        a.textContent = t.github;
        controlsRow.appendChild(a);
      }
      if (project.links?.["itch.io"]) {
        const a = document.createElement("a");
        a.href = project.links["itch.io"];
        a.target = "_blank";
        a.className = "btn btn-outline-dark btn-sm";
        a.textContent = t.itch;
        controlsRow.appendChild(a);
      }
      if (project.links?.documentation) {
        const a = document.createElement("a");
        a.href = project.links.documentation;
        a.target = "_blank";
        a.className = "btn btn-outline-dark btn-sm";
        a.textContent = this.language === "pl" ? t.docs : t.docsEn;
        controlsRow.appendChild(a);
      }
      if (project.links?.download) {
        const a = document.createElement("a");
        a.href = project.links.download;
        a.target = "_blank";
        a.className = "btn btn-outline-dark btn-sm";
        a.textContent = this.language === "pl" ? "Pobierz" : "Download";
        controlsRow.appendChild(a);
      }
      cardBody.appendChild(controlsRow);

      const datesWrap = document.createElement("div");
      datesWrap.className = "text-muted mt-2";
      const updated = document.createElement("div");
      updated.style.fontSize = "0.9em";
      updated.textContent =
        `${t.lastUpdated}: ` +
        new Date(project.last_updated_date).toLocaleDateString(
          this.language === "pl" ? "pl-PL" : "en-US",
          { year: "numeric", month: "long", day: "numeric" }
        );
      const started = document.createElement("div");
      started.style.fontSize = "0.95em";
      started.textContent =
        `${t.startDate}: ` +
        new Date(project.start_date).toLocaleDateString(
          this.language === "pl" ? "pl-PL" : "en-US",
          { year: "numeric", month: "long", day: "numeric" }
        );
      datesWrap.appendChild(updated);
      datesWrap.appendChild(started);
      cardBody.appendChild(datesWrap);

      const brief = document.createElement("p");
      brief.className = "card-text mt-2";
      brief.textContent = project.brief[this.language];
      cardBody.appendChild(brief);

      const details = document.createElement("div");
      details.className = "mt-3 projects-details";
      details.style.maxHeight = "0";
      details.style.overflow = "hidden";
      details.style.transition = "max-height 300ms ease";

      if (project.video_url?.[this.language]) {
        if (this.showLogs) console.log("Adding video");
        const videoLabel = document.createElement("h4");
        videoLabel.className = "mt-2";
        videoLabel.textContent = t.video;
        details.appendChild(videoLabel);
        const videoContainer = VideoConverter.getInstance().convert(
          project.video_url[this.language]
        );
        details.appendChild(videoContainer);
      }

      const descWrap = document.createElement("div");
      descWrap.className = "mt-3";
      descWrap.innerHTML = project.description?.[this.language] || "";
      details.appendChild(descWrap);

      if (Array.isArray(project.images) && project.images.length) {
        if (this.showLogs) console.log("Adding images carousel");
        let currentIndex = 0;
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "d-flex flex-column align-items-center mt-3";

        const img = document.createElement("img");
        img.src = project.images[currentIndex];
        img.alt = project.name[this.language];
        img.className = "img-fluid rounded mb-2 projects-fade";
        img.style.maxHeight = "420px";
        img.style.objectFit = "contain";
        img.style.transition = "opacity 200ms ease";
        img.addEventListener("click", () =>
          this.openLightbox(project.images, currentIndex)
        );
        imgWrapper.appendChild(img);

        const navBtns = document.createElement("div");
        navBtns.className = "d-flex justify-content-center gap-2";

        const prevBtn = document.createElement("button");
        prevBtn.className = "btn btn-outline-secondary btn-sm";
        prevBtn.textContent = t.prevImg;
        prevBtn.addEventListener("click", () => {
          currentIndex =
            (currentIndex - 1 + project.images.length) % project.images.length;
          img.style.opacity = "0";
          setTimeout(() => {
            img.src = project.images[currentIndex];
            img.style.opacity = "1";
          }, 180);
        });

        const nextBtn = document.createElement("button");
        nextBtn.className = "btn btn-outline-secondary btn-sm";
        nextBtn.textContent = t.nextImg;
        nextBtn.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % project.images.length;
          img.style.opacity = "0";
          setTimeout(() => {
            img.src = project.images[currentIndex];
            img.style.opacity = "1";
          }, 180);
        });

        navBtns.appendChild(prevBtn);
        navBtns.appendChild(nextBtn);
        imgWrapper.appendChild(navBtns);
        details.appendChild(imgWrapper);
      }

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "btn btn-primary btn-sm mt-3";
      toggle.textContent =
        this.language === "pl" ? this.text.pl.showMore : this.text.en.showMore;
      toggle.addEventListener("click", () => {
        const isClosed =
          details.style.maxHeight === "0px" || details.style.maxHeight === "0";
        if (isClosed) {
          details.style.maxHeight = details.scrollHeight + 40 + "px";
          toggle.textContent =
            this.language === "pl"
              ? this.text.pl.showLess
              : this.text.en.showLess;
        } else {
          details.style.maxHeight = "0";
          toggle.textContent =
            this.language === "pl"
              ? this.text.pl.showMore
              : this.text.en.showMore;
          card.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });

      cardBody.appendChild(details);
      cardBody.appendChild(toggle);
      card.appendChild(cardBody);
      this.listHost.appendChild(card);
    });
    if (this.showLogs) console.log("All projects rendered");
  }

  openLightbox(images, startIndex = 0) {
    const t = this.text[this.language];
    if (this.showLogs) console.log("Opening lightbox at index:", startIndex);
    let index = startIndex;

    const overlay = document.createElement("div");
    overlay.className = "projects-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const img = document.createElement("img");
    img.className = "projects-lightbox-img";
    img.src = images[index];

    const btnPrev = document.createElement("button");
    btnPrev.className = "projects-lightbox-btn projects-lightbox-prev";
    btnPrev.textContent = "‹";

    const btnNext = document.createElement("button");
    btnNext.className = "projects-lightbox-btn projects-lightbox-next";
    btnNext.textContent = "›";

    const btnClose = document.createElement("button");
    btnClose.className = "projects-lightbox-close";
    btnClose.setAttribute("aria-label", t.close);
    btnClose.textContent = "×";

    const setSrc = (i) => {
      img.classList.add("projects-fade-out");
      setTimeout(() => {
        img.src = images[i];
        img.classList.remove("projects-fade-out");
        img.classList.add("projects-fade-in");
        setTimeout(() => img.classList.remove("projects-fade-in"), 180);
      }, 180);
    };

    const prev = () => {
      index = (index - 1 + images.length) % images.length;
      setSrc(index);
    };
    const next = () => {
      index = (index + 1) % images.length;
      setSrc(index);
    };
    const close = () => {
      overlay.classList.remove("open");
      overlay.classList.add("closing");
      setTimeout(() => {
        document.body.removeChild(overlay);
        document.removeEventListener("keydown", onKey);
        if (this.showLogs) console.log("Lightbox closed");
      }, 180);
    };
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    btnPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      prev();
    });
    btnNext.addEventListener("click", (e) => {
      e.stopPropagation();
      next();
    });
    btnClose.addEventListener("click", (e) => {
      e.stopPropagation();
      close();
    });

    overlay.appendChild(img);
    overlay.appendChild(btnPrev);
    overlay.appendChild(btnNext);
    overlay.appendChild(btnClose);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("open"));
    document.addEventListener("keydown", onKey);
  }

  injectStyles() {
    if (document.getElementById("projects-lightbox-styles")) return;
    const css = `
.projects-lightbox{position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 180ms ease;z-index:1055}
.projects-lightbox.open{opacity:1}
.projects-lightbox.closing{opacity:0}
.projects-lightbox-img{max-width:92vw;max-height:88vh;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.5);transform:scale(.96);transition:transform 180ms ease,opacity 180ms ease}
.projects-lightbox.open .projects-lightbox-img{transform:scale(1)}
.projects-lightbox-btn{position:absolute;top:50%;transform:translateY(-50%);border:none;background:rgba(255,255,255,.15);backdrop-filter:blur(4px);padding:.4rem .7rem;border-radius:999px;font-size:2rem;line-height:1;color:#fff;cursor:pointer;transition:background 150ms ease, transform 150ms ease}
.projects-lightbox-btn:hover{background:rgba(255,255,255,.3);transform:translateY(-50%) scale(1.05)}
.projects-lightbox-prev{left:2vw}
.projects-lightbox-next{right:2vw}
.projects-lightbox-close{position:absolute;top:2vh;right:2vw;border:none;background:rgba(255,255,255,.15);backdrop-filter:blur(4px);color:#fff;font-size:2rem;line-height:1;border-radius:999px;padding:.2rem .6rem;cursor:pointer;transition:background 150ms ease, transform 150ms ease}
.projects-lightbox-close:hover{background:rgba(255,255,255,.3);transform:scale(1.05)}
.projects-fade-out{opacity:0}
.projects-fade-in{opacity:1}
`;
    const style = document.createElement("style");
    style.id = "projects-lightbox-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  translateSection(language = "pl") {
    if (this.showLogs) console.log(`Translating section to: ${language}`);
    this.language = language;
    this.render();
  }
}
