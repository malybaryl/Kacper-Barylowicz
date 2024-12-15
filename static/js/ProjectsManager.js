import Project from "./Project.js";
import JsonHandler from "./JsonHandler.js";

export default class ProjectsManager {
  constructor(language = "pl") {
    this.language = language;
    this.projects = [];
    this.text = {};
    this.projectSectionsName = {};
    this.projectSection = document.querySelector("#projects");
    if (this.projectSection === null) {
      throw new Error("Project section element not found");
    }
    const nav = document.createElement("nav");
    nav.classList.add("project-tile-nav");
    this.projectSection.appendChild(nav);
    this.projectNav = nav;
  }

  async #fetchTextFromJson(path = "", language = "pl") {
    try {
      return await JsonHandler.readJson(path, language);
    } catch (error) {
      console.error("Error loading JSON data:", error);
    }
  }

  #addProjectsToHtml() {
    try {
      this.projects.forEach((project) => {
        // variables
        let pHashtags = null;
        let pLinks = null;
        let pTechnologies = null;
        let pAdditionalText = null;
        let pImageTitle = null;
        let imgContainer = null;
        let pTechnologiesTitle = null;

        // link
        const link = document.createElement("a");
        link.href = "#" + project.getId();
        const linkDiv = document.createElement("div");
        linkDiv.classList.add("tile");
        linkDiv.textContent = project.getTitle();
        link.appendChild(linkDiv);
        this.projectNav.appendChild(link);

        // project content
        const div = document.createElement("div");
        div.classList.add("project-div");
        div.id = project.getId();

        const Title = document.createElement("h2");
        Title.textContent = project.getTitle();

        const hashtags = project.getHashtags();
        if (hashtags.length > 0) {
          pHashtags = document.createElement("p");
          pHashtags.classList.add("project-hashtags");
          hashtags.forEach((hashtag) => {
            const span = document.createElement("span");
            span.classList.add("project-hashtag");
            span.textContent = "#" + hashtag + " ";
            pHashtags.appendChild(span);
          });
        }

        const links = project.getLinks();
        if (links?.length > 0) {
          pLinks = document.createElement("p");
          pLinks.classList.add("project-links");
          links.forEach(([name, link]) => {
            const a = document.createElement("a");
            a.target = "_blank";
            a.textContent = name;
            a.href = link;
            pLinks.appendChild(a);
          });
        }

        const pStartDate = document.createElement("p");
        pStartDate.classList.add("project-start-date");
        pStartDate.textContent =
          this.projectSectionsName.start_date + ": " + project.getStartDate();

        const pLastUpdate = document.createElement("p");
        pLastUpdate.classList.add("project-last-update");
        pLastUpdate.textContent =
          this.projectSectionsName.last_update + ": " + project.getLastUpdate();

        const pDescriptionSection = document.createElement("h1");
        pDescriptionSection.style.fontWeight = "bold";
        pDescriptionSection.textContent =
          this.projectSectionsName.description ?? "";

        const description = document.createElement("p");
        description.classList.add("project-description");
        description.textContent = project.getDescription();

        const technologies = project.getTechnologies();
        if (technologies.length > 0) {
          pTechnologiesTitle = document.createElement("h1");
          pTechnologiesTitle.style.fontWeight = "bold";
          pTechnologiesTitle.textContent =
            this.projectSectionsName.technologies ?? "";
          pTechnologies = document.createElement("p");
          const ul = document.createElement("ul");
          pTechnologies.classList.add("project-technologies");
          technologies.forEach((technology) => {
            const li = document.createElement("li");
            li.classList.add("project-technology");
            li.textContent = technology;
            pTechnologies.appendChild(li);
          });
        }

        const additionlText = project.getAdditionalText();
        if (additionlText !== "") {
          pAdditionalText = document.createElement("p");
          pAdditionalText.classList.add("project-additional-text");
          pAdditionalText.innerHTML = additionlText;
        }

        const images = project.getImages();

        if (images.length > 0) {
          pImageTitle = document.createElement("h1");
          pImageTitle.style.fontWeight = "bold";
          pImageTitle.textContent = this.projectSectionsName.images ?? "";
          imgContainer = document.createElement("div");
          imgContainer.classList.add("project-img-container");
          images.forEach(([image_alt, image]) => {
            const img = document.createElement("img");
            img.classList.add("project-img");
            img.src = image;
            img.alt = image_alt;
            imgContainer.appendChild(img);
          });
        }

        // addig to DOM
        div.appendChild(Title);
        if (pHashtags !== null) {
          div.appendChild(pHashtags);
        }
        if (pLinks !== null) {
          div.appendChild(pLinks);
        }
        div.appendChild(pStartDate);
        div.appendChild(pLastUpdate);
        div.appendChild(pDescriptionSection);
        div.appendChild(description);
        if (pTechnologies !== null) {
          div.appendChild(pTechnologiesTitle);
          div.appendChild(pTechnologies);
        }
        if (pAdditionalText !== null) {
          div.appendChild(pAdditionalText);
        }
        if (imgContainer !== null) {
          div.appendChild(pImageTitle);
          div.appendChild(imgContainer);
        }

        this.projectSection.appendChild(div);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async generate(language) {
    this.projects = [];
    this.language = language;
    const nav = document.createElement("nav");
    nav.classList.add("project-tile-nav");
    this.projectSection.appendChild(nav);
    this.projectNav = nav;
    this.projectSectionsName = await this.#fetchTextFromJson(
      "static/json/projectssections.json",
      this.language
    );
    this.text = await this.#fetchTextFromJson(
      "static/json/projects.json",
      this.language
    );

    if (this.text.reclawler_title !== undefined) {
      try {
        this.addProject(
          this.text.reclawler_title,
          this.text.reclawler_id,
          this.text.reclawler_hashtags,
          this.text.reclawler_startDate,
          this.text.reclawler_lastUpdate,
          this.text.reclawler_links,
          this.text.reclawler_description,
          this.text.reclawler_Technologies,
          this.text.reclawler_additionalText,
          this.text.reclawler_images
        );
      } catch (error) {
        console.error(error);
      }
      try {
        this.addProject(
          this.text.evolution_conquer_title,
          this.text.evolution_conquer_id,
          this.text.evolution_conquer_hashtags,
          this.text.evolution_conquer_startDate,
          this.text.evolution_conquer_lastUpdate,
          this.text.evolution_conquer_links,
          this.text.evolution_conquer_description,
          this.text.evolution_conquer_Technologies,
          this.text.evolution_conquer_additionalText,
          this.text.evolution_conquer_images
        );
      } catch (error) {
        console.error(error);
      }
      try {
        this.addProject(
          this.text.windy_weather_title,
          this.text.windy_weather_id,
          this.text.windy_weather_hashtags,
          this.text.windy_weather_startDate,
          this.text.windy_weather_lastUpdate,
          this.text.windy_weather_links,
          this.text.windy_weather_description,
          this.text.windy_weather_Technologies,
          this.text.windy_weather_additionalText,
          this.text.windy_weather_images
        );
      } catch (error) {
        console.error(error);
      }
      try {
        this.addProject(
          this.text.snake_title,
          this.text.snake_id,
          this.text.snake_hashtags,
          this.text.snake_startDate,
          this.text.snake_lastUpdate,
          this.text.snake_links,
          this.text.snake_description,
          this.text.snake_Technologies,
          this.text.snake_additionalText,
          this.text.snake_images
        );
      } catch (error) {
        console.error(error);
      }
      try {
        this.addProject(
          this.text.qr_code_generator_title,
          this.text.qr_code_generator_id,
          this.text.qr_code_generator_hashtags,
          this.text.qr_code_generator_startDate,
          this.text.qr_code_generator_lastUpdate,
          this.text.qr_code_generator_links,
          this.text.qr_code_generator_description,
          this.text.qr_code_generator_Technologies,
          this.text.qr_code_generator_additionalText,
          this.text.qr_code_generator_images
        );
      } catch (error) {
        console.error(error);
      }
      try {
        this.addProject(
          this.text.rejestr_zarejestrownych_pojazdow_title,
          this.text.rejestr_zarejestrownych_pojazdow_id,
          this.text.rejestr_zarejestrownych_pojazdow_hashtags,
          this.text.rejestr_zarejestrownych_pojazdow_startDate,
          this.text.rejestr_zarejestrownych_pojazdow_lastUpdate,
          this.text.rejestr_zarejestrownych_pojazdow_links,
          this.text.rejestr_zarejestrownych_pojazdow_description,
          this.text.rejestr_zarejestrownych_pojazdow_Technologies,
          this.text.rejestr_zarejestrownych_pojazdow_additionalText,
          this.text.rejestr_zarejestrownych_pojazdow_images
        );
      } catch (error) {
        console.error(error);
      }
      try {
        this.addProject(
          this.text.st_nicholas_day_drawing_program_title,
          this.text.st_nicholas_day_drawing_program_id,
          this.text.st_nicholas_day_drawing_program_hashtags,
          this.text.st_nicholas_day_drawing_program_startDate,
          this.text.st_nicholas_day_drawing_program_lastUpdate,
          this.text.st_nicholas_day_drawing_program_links,
          this.text.st_nicholas_day_drawing_program_description,
          this.text.st_nicholas_day_drawing_program_Technologies,
          this.text.st_nicholas_day_drawing_program_additionalText,
          this.text.st_nicholas_day_drawing_program_images
        );
      } catch (error) {
        console.error(error);
      }
      try {
        this.addProject(
          this.text.the_recursive_robot_title,
          this.text.the_recursive_robot_id,
          this.text.the_recursive_robot_hashtags,
          this.text.the_recursive_robot_startDate,
          this.text.the_recursive_robot_lastUpdate,
          this.text.the_recursive_robot_links,
          this.text.the_recursive_robot_description,
          this.text.the_recursive_robot_Technologies,
          this.text.the_recursive_robot_additionalText,
          this.text.the_recursive_robot_images
        );
      } catch (error) {
        console.error(error);
      }
    }

    try {
      this.#addProjectsToHtml();
    } catch (error) {
      console.error(error);
    }
  }
  addProject(
    title,
    id,
    hashtags,
    startDate,
    lastUpdate,
    links,
    description,
    Technologies,
    additionalText,
    images
  ) {
    this.projects.push(
      new Project(
        title,
        id,
        hashtags,
        startDate,
        lastUpdate,
        links,
        description,
        Technologies,
        additionalText,
        images
      )
    );
  }
}
