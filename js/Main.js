import Quote from "./Quote.js";
import ArrowButton from "./ArrowButton.js";
import ImageHandler from "./ImageHandler.js";


class Main {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            const imageHandler = new ImageHandler();
            imageHandler.zoomImageInit();
        });
    }
}

const main = new Main();
