export default class Certificates {
  constructor(certificates, title, language = "pl", showLogs = false) {
    this.original = Array.isArray(certificates) ? certificates : [];
    this.items = [...this.original];
    this.title = title;
    this.language = language;
    this.showLogs = showLogs;
    this.state = { tag: "ALL", sort: "date_asc", query: "" };
    this.text = {
      pl: {
        allTags: "Wszystkie tagi",
        sortBy: "Sortowanie",
        sortOptions: {
          date_desc: "Data ⟱ (najstarsze)",
          date_asc: "Data ⟰ (najnowsze)",
          title_asc: "Tytuł A–Z",
          title_desc: "Tytuł Z–A",
        },
        searchPlaceholder: "Szukaj w certyfikatach...",
        date: "Data",
        view: "Zobacz certyfikat",
        link: "Link do certyfikatu",
        close: "Zamknij",
      },
      en: {
        allTags: "All tags",
        sortBy: "Sort by",
        sortOptions: {
          date_desc: "Date ⟱ (oldest)",
          date_asc: "Date ⟰ (newest)",
          title_asc: "Title A–Z",
          title_desc: "Title Z–A",
        },
        searchPlaceholder: "Search certificates...",
        date: "Date",
        view: "View certificate",
        link: "Certificate link",
        close: "Close",
      },
    };
  }

  render() {
    this.injectStyles();
    if (this.showLogs) console.log("Rendering Certificates section");
    const section = document.querySelector("#certificates");
    if (!section) {
      if (this.showLogs) console.error("Certificates section not found");
      return;
    }
    section.innerHTML = "";
    const container = document.createElement("div");
    container.className = "container";
    const title = document.createElement("h2");
    title.className = "mb-3";
    title.textContent = this.title[this.language];
    container.appendChild(title);
    const controls = this.buildControls();
    container.appendChild(controls);
    this.listHost = document.createElement("div");
    container.appendChild(this.listHost);
    section.appendChild(container);
    this.applySortFilterSearch();
  }

  buildControls() {
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
    const allOpt = document.createElement("option");
    allOpt.value = "ALL";
    allOpt.textContent = t.allTags;
    tagSelect.appendChild(allOpt);
    tags.forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      tagSelect.appendChild(opt);
    });
    tagSelect.value = this.state.tag;
    tagSelect.addEventListener("change", () => {
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
    [
      ["date_desc", t.sortOptions.date_desc],
      ["date_asc", t.sortOptions.date_asc],
      ["title_asc", t.sortOptions.title_asc],
      ["title_desc", t.sortOptions.title_desc],
    ].forEach(([val, lab]) => {
      const opt = document.createElement("option");
      opt.value = val;
      opt.textContent = lab;
      sortSelect.appendChild(opt);
    });
    sortSelect.value = this.state.sort;
    sortSelect.addEventListener("change", () => {
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
      this.state.query = searchInput.value;
      this.applySortFilterSearch();
    });
    colSearch.appendChild(searchLabel);
    colSearch.appendChild(searchInput);

    wrapper.appendChild(colTag);
    wrapper.appendChild(colSort);
    wrapper.appendChild(colSearch);
    return wrapper;
  }

  collectTags() {
    const set = new Set();
    this.original.forEach((c) => (c.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, this.language));
  }

  applySortFilterSearch() {
    let list = [...this.original];
    if (this.state.tag !== "ALL") {
      list = list.filter((c) => (c.tags || []).includes(this.state.tag));
    }
    if (this.state.query.trim() !== "") {
      const q = this.state.query.trim().toLowerCase();
      list = list.filter((c) => {
        const name = (c.name?.[this.language] || "").toLowerCase();
        const desc = (c.description?.[this.language] || "")
          .replace(/<[^>]*>/g, "")
          .toLowerCase();
        const tags = (c.tags || []).join(" ").toLowerCase();
        const links = (c.links || []).join(" ").toLowerCase();
        return [name, desc, tags, links].some((s) => s.includes(q));
      });
    }
    this.items = this.sortItems(list, this.state.sort);
    this.renderList();
  }

  sortItems(arr, type) {
    const byDate = (dir) => (a, b) =>
      (dir === "desc" ? 1 : -1) * (new Date(a.date) - new Date(b.date));
    const byName = (dir) => (a, b) =>
      (dir === "desc" ? -1 : 1) *
      a.name[this.language].localeCompare(b.name[this.language], this.language);
    switch (type) {
      case "date_asc":
        return arr.sort(byDate("asc"));
      case "date_desc":
        return arr.sort(byDate("desc"));
      case "title_asc":
        return arr.sort(byName("asc"));
      case "title_desc":
        return arr.sort(byName("desc"));
      default:
        return arr.sort(byDate("desc"));
    }
  }

  renderList() {
    const t = this.text[this.language];
    this.listHost.innerHTML = "";
    this.items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card mb-3";
      const body = document.createElement("div");
      body.className = "card-body";

      const h3 = document.createElement("h3");
      h3.className = "card-title";
      h3.textContent = item.name[this.language];
      body.appendChild(h3);

      (item.tags || []).forEach((tag) => {
        const badge = document.createElement("span");
        badge.className = "badge bg-primary me-1";
        badge.textContent = tag;
        body.appendChild(badge);
      });

      const meta = document.createElement("div");
      meta.className = "text-muted mt-2";
      meta.style.fontSize = "0.9em";
      meta.textContent =
        `${t.date}: ` +
        new Date(item.date).toLocaleDateString(
          this.language === "pl" ? "pl-PL" : "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
      body.appendChild(meta);

      const desc = document.createElement("p");
      desc.className = "card-text mt-2";
      desc.textContent = (item.description?.[this.language] || "").replace(
        /<[^>]*>/g,
        ""
      );
      body.appendChild(desc);

      if (Array.isArray(item.links) && item.links.length) {
        const a = document.createElement("a");
        a.href = item.links[0];
        a.target = "_blank";
        a.rel = "noopener";
        a.className = "btn btn-primary btn-sm mt-2";
        a.textContent = t.link;
        body.appendChild(a);
      }

      if (Array.isArray(item.images) && item.images.length) {
        const viewBtn = document.createElement("button");
        viewBtn.type = "button";
        viewBtn.className = "btn btn-secondary btn-sm mt-2 ms-2";
        viewBtn.textContent = t.view;
        viewBtn.addEventListener("click", () => {
          this.openLightbox(item.images, 0);
        });
        body.appendChild(viewBtn);
      }

      card.appendChild(body);
      this.listHost.appendChild(card);
    });
  }

  openLightbox(images, startIndex = 0) {
    const t = this.text[this.language];
    let index = startIndex;
    const overlay = document.createElement("div");
    overlay.className = "cert-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const img = document.createElement("img");
    img.className = "cert-lightbox-img";
    img.src = images[index];

    const btnPrev = document.createElement("button");
    btnPrev.className = "cert-lightbox-btn cert-prev";
    btnPrev.textContent = "‹";

    const btnNext = document.createElement("button");
    btnNext.className = "cert-lightbox-btn cert-next";
    btnNext.textContent = "›";

    const btnClose = document.createElement("button");
    btnClose.className = "cert-lightbox-close";
    btnClose.setAttribute("aria-label", t.close);
    btnClose.textContent = "×";

    const setSrc = (i) => {
      img.classList.add("cert-fade-out");
      setTimeout(() => {
        img.src = images[i];
        img.classList.remove("cert-fade-out");
        img.classList.add("cert-fade-in");
        setTimeout(() => img.classList.remove("cert-fade-in"), 180);
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
    if (document.getElementById("certificates-styles")) return;
    const css = `
.cert-lightbox{position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 180ms ease;z-index:1055}
.cert-lightbox.open{opacity:1}
.cert-lightbox.closing{opacity:0}
.cert-lightbox-img{max-width:92vw;max-height:88vh;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.5);transform:scale(.96);transition:transform 180ms ease,opacity 180ms ease}
.cert-lightbox.open .cert-lightbox-img{transform:scale(1)}
.cert-lightbox-btn{position:absolute;top:50%;transform:translateY(-50%);border:none;background:rgba(255,255,255,.15);backdrop-filter:blur(4px);padding:.4rem .7rem;border-radius:999px;font-size:2rem;line-height:1;color:#fff;cursor:pointer;transition:background 150ms ease, transform 150ms ease}
.cert-lightbox-btn:hover{background:rgba(255,255,255,.3);transform:translateY(-50%) scale(1.05)}
.cert-prev{left:2vw}
.cert-next{right:2vw}
.cert-lightbox-close{position:absolute;top:2vh;right:2vw;border:none;background:rgba(255,255,255,.15);backdrop-filter:blur(4px);color:#fff;font-size:2rem;line-height:1;border-radius:999px;padding:.2rem .6rem;cursor:pointer;transition:background 150ms ease, transform 150ms ease}
.cert-lightbox-close:hover{background:rgba(255,255,255,.3);transform:scale(1.05)}
.cert-fade-out{opacity:0}
.cert-fade-in{opacity:1}
`;
    const style = document.createElement("style");
    style.id = "certificates-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  translateSection(language = "pl") {
    this.language = language;
    this.render();
  }
}
