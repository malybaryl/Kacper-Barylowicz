export default class Projects {
  constructor(projects, title, language = "pl", showLogs = false) {
    this.projects = projects;
    this.title = title;
    this.language = language;
    this.showLogs = showLogs;
  }

  render() {
    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log(`Rendering Projects section in ${this.language}`);
    }

    const section = document.querySelector("#projects");
    if (!section) {
      console.error("Projects section not found in the document.");
      return;
    }

    const container = document.createElement("div");
    container.className = "container";
    if (this.showLogs) {
      console.log("Container created for Projects section.");
    }

    const title = document.createElement("h2");
    title.className = "mb-3";
    title.textContent = this.title[this.language];
    container.appendChild(title);

    section.appendChild(container);

    if (this.showLogs) {
      console.log("Projects section rendered successfully.");
    }

    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log("Started rendering Projects.");
    }

    this.sortProjects("newest");

    this.projects.forEach((project) => {
      const card = document.createElement("div");
      card.className = "card mb-3";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const cardTitle = document.createElement("h3");
      cardTitle.className = "card-title";
      cardTitle.textContent = project.name[this.language];
      cardBody.appendChild(cardTitle);

      project.tags.forEach((tag) => {
        const badge = document.createElement("span");
        badge.className = "badge bg-primary me-1";
        badge.textContent = tag;
        cardBody.appendChild(badge);
      });

      const lineBreak = document.createElement("p");
      cardBody.appendChild(lineBreak);

      if (project.links.github) {
        const githubLink = document.createElement("a");
        githubLink.href = project.links.github;
        githubLink.target = "_blank";
        githubLink.className = "btn btn-outline-dark btn-sm me-2";
        githubLink.textContent = "GitHub";
        cardBody.appendChild(githubLink);
      }

      if (project.links["itch.io"]) {
        const itchLink = document.createElement("a");
        itchLink.href = project.links["itch.io"];
        itchLink.target = "_blank";
        itchLink.className = "btn btn-outline-dark btn-sm";
        itchLink.textContent = "itch.io";
        cardBody.appendChild(itchLink);
      }

      if (project.links.documentation) {
        const docLink = document.createElement("a");
        docLink.href = project.links.documentation;
        docLink.target = "_blank";
        docLink.className = "btn btn-outline-dark btn-sm me-2";
        if (this.language === "pl") {
          docLink.textContent = "Dokumentacja";
        } else {
          docLink.textContent = "Documentation (PL)";
        }
        cardBody.appendChild(docLink);
      }

      if (this.language === "pl") {
        const updatedDate = document.createElement("p");
        updatedDate.className = "text-muted mt-2";
        updatedDate.style.fontSize = "0.9em";
        updatedDate.textContent = `Ostatnia aktualizacja: ${new Date(
          project.last_updated_date
        ).toLocaleDateString("pl-PL", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`;

        const startDate = document.createElement("p");
        startDate.className = "text-muted mt-2";
        startDate.style.fontSize = "0.95em";
        startDate.textContent = `Data rozpoczęcia: ${new Date(
          project.start_date
        ).toLocaleDateString("pl-PL", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`;
        cardBody.appendChild(updatedDate);
        updatedDate.appendChild(startDate);
      } else {
        const updatedDate = document.createElement("p");
        updatedDate.className = "text-muted mt-2";
        updatedDate.style.fontSize = "0.9em";
        updatedDate.textContent = `Last updated: ${new Date(
          project.last_updated_date
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`;

        const startDate = document.createElement("p");
        startDate.className = "text-muted mt-2";
        startDate.style.fontSize = "0.95em";
        startDate.textContent = `Start date: ${new Date(
          project.start_date
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`;
        cardBody.appendChild(updatedDate);
        cardBody.appendChild(startDate);
      }

      const brief = document.createElement("p");
      brief.className = "card-text mt-2";
      brief.textContent = project.brief[this.language];
      cardBody.appendChild(brief);

      card.appendChild(cardBody);
      container.appendChild(card);

      if (this.showLogs) {
        console.log(`Project "${project.name[this.language]}" rendered.`);
      }
    });

    if (this.showLogs) {
      console.log("All projects rendered successfully.");
    }
  }

  sortProjects(type) {
    if (type === "newest") {
      this.projects.sort(
        (a, b) => new Date(b.last_updated_date) - new Date(a.last_updated_date)
      );
    }
  }

  translateSection(language = "pl") {
    this.language = language;

    if (this.showLogs) {
      console.log("--------------------------------------");
      console.log(`Translating Projects section to ${this.language}`);
    }

    const section = document.querySelector("#projects");
    if (!section) {
      console.error("Projects section not found in the document.");
      return;
    }

    section.querySelector(".container").remove();

    this.render();
  }
}

// {
//   "projects": [
//     {
//       "id": 1,
//       "name": {
//         "pl": "Evolution Conquer",
//         "en": "Evolution Conquer"
//       },
//       "brief": {
//         "pl": "Weź udział w epickiej podróży od najmniejszej komórki po najjaśniejszą gwiazdę we wszechświecie w grze Evolution Conquer. Rozpocznij swoją przygodę głęboko w oceanie jako mikroskopijny organizm, rośnij poprzez jedzenie, ewoluowanie i podbijanie swojego otoczenia.",
//         "en": "Embark on an epic journey from the tiniest cell to the brightest star in the universe in the game Evolution Conquer. Begin your adventure deep in the ocean as a microscopic organism, grow by consuming, evolving, and conquering your surroundings."
//       },
//       "description": {
//         "pl": "<p>Weź udział w epickiej podróży od najmniejszej komórki po najjaśniejszą gwiazdę we wszechświecie w grze <strong>Evolution Conquer</strong>. Rozpocznij swoją przygodę głęboko w oceanie jako mikroskopijny organizm, rośnij poprzez jedzenie, ewoluowanie i podbijanie swojego otoczenia.</p><h2>Technologie</h2><ul><li>Godot Engine: Użyty do tworzenia gry.</li><li>Ręcznie rysowane grafiki: Wszystkie postacie i elementy gry zostały stworzone ręcznie.</li></ul><h2>Wyniki</h2><p>Evolution Conquer wzięła udział w konkursie <strong>GMTK Game Jam 2024</strong>, osiągając następujące wyniki:</p><ul><li>Kategoria Przyjemność: #4574</li><li>Kategoria Styl: #4792</li><li>Kategoria Ogólna: #5100</li><li>Kategoria Kreatywność: #5623</li></ul><p>Gra powstawała przez 96 godzin i była dostosowana do tematu konkursu <em>\"Build to Scale\"</em>, poprzez ewolucję postaci od mikroskopijnej komórki, przez rybę, ptaka, meteoryt, aż po ogromne słońce.</p><img id=\"evolution-conquer-scores\" src=\"static/img/projects/evolution-conquer/scores.jpeg\" alt=\"scores\"><p id=\"evolution-conquer-scores-addnotation\">[Zdjęcie z wynikami konkursu (<a href=\"https://itch.io/jam/gmtk-2024/rate/2911121\" target=\"_blank\">link</a>)]</p>",
//         "en": "<p>Embark on an epic journey from the tiniest cell to the brightest star in the universe in the game <strong>Evolution Conquer</strong>. Begin your adventure deep in the ocean as a microscopic organism, grow by consuming, evolving, and conquering your surroundings.</p><h2>Technologies</h2><ul><li>Godot Engine: Used for creating the game.</li><li>Hand-drawn graphics: All characters and game elements were created by hand.</li></ul><h2>Scores</h2><p>Evolution Conquer participated in the <strong>GMTK Game Jam 2024</strong>, achieving the following results:</p><ul><li>Fun Category: #4574</li><li>Style Category: #4792</li><li>Overall Category: #5100</li><li>Creativity Category: #5623</li></ul><p>The game was developed over 96 hours and tailored to the jam's theme, <em>\"Build to Scale\"</em>, by evolving the character from a microscopic cell through stages such as a fish, bird, meteor, and ultimately, a massive sun.</p><img id=\"evolution-conquer-scores\" src=\"static/img/projects/evolution-conquer/scores.jpeg\" alt=\"scores\"><p id=\"evolution-conquer-scores-addnotation\">[Image showing competition results (<a href=\"https://itch.io/jam/gmtk-2024/rate/2911121\" target=\"_blank\">link</a>)]</p>"
//       },
//       "video_url": {
//         "pl": "https://www.youtube.com/embed/PDYXlpL3HIM?si=I9cQY_IeKAXcEOiv",
//         "en": "https://www.youtube.com/embed/PDYXlpL3HIM?si=I9cQY_IeKAXcEOiv"
//       },
//       "images": [
//         "static/img/projects/evolution-conquer/game-logo.png",
//         "static/img/projects/evolution-conquer/game-screenshot-1.png",
//         "static/img/projects/evolution-conquer/game-screenshot-2.png",
//         "static/img/projects/evolution-conquer/game-screenshot-3.png",
//         "static/img/projects/evolution-conquer/game-screenshot-4.png"
//       ],
//       "tags": ["gdscript", "godot", "game", "gamejam", "GMTK-game-jam"],
//       "links": {
//         "github": "https://github.com/malybaryl/evolution-conquer/tree/main",
//         "itch.io": "https://sipmleecodee.itch.io/evolution-conquer"
//       },
//       "start_date": "2024-08-16",
//       "last_updated_date": "2024-09-08"
//     },
