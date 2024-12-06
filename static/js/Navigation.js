export default class Navigation {
    constructor() {
        this.navigation = document.querySelector('.tile-nav');
    }

    generateTile(
        language = 'pl',
        href = "#", 
        text = "",
        img = null,
        imgAlt = "",
    ){
        const tile = document.createElement('a');
        tile.href = href;
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        tileDiv.textContent = text;
        if (img != null) {
            const imgElement = document.createElement('img');
            imgElement.src = img;
            imgElement.alt = imgAlt;
            tileDiv.appendChild(imgElement);
        }
        tile.appendChild(tileDiv);
        this.navigation.appendChild(tile);
    }

    changeLanguege(language = 'en') {

    }
}


{/* <nav class="tile-nav">
        <a href="#about">
          <div class="tile">O mnie</div>
        </a>
        <a href="#experience">
          <div class="tile">Wykształcenie</div>
        </a>
        <a href="#skills">
          <div class="tile">Umiejętności</div>
        </a>
        <a href="#projects">
          <div class="tile">Projekty</div>
        </a>
        <a href="#certificates">
          <div class="tile">Certyfikaty</div>
        </a>
        <a href="https://github.com/malybaryl" target="_blank">
          <div class="tile icon-tile">
            <img src="static/img/github.svg" alt="GitHub" />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/kacperbarylowicz" target="_blank">
          <div class="tile icon-tile">
            <img src="static/img/linkedin.png" alt="LinkedIn" />
          </div>
        </a>
        <a href="https://discord.com/invite/Htk2nmbRRK" target="_blank">
          <div class="tile icon-tile">
            <img src="static/img/discord.svg" alt="Discord" />
          </div>
        </a>
        <a href="mailto:kacper.barylowicz@outlook.com">
          <div class="tile icon-tile">
            <span class="material-symbols-outlined"> mail </span>
          </div>
        </a>
      </nav> */}