import Quote from "./Quote.js";
import ArrowButton from "./ArrowButton.js";


class Main {
    constructor() {

        // Tworzymy instancję ArrowButton, aby uzyskać dostęp do metod
        const arrowButtonInstance = new ArrowButton();

        const arrowButtonsHTML = arrowButtonInstance.getAllButtons();
        const imagesConnectedWithArrowButtons = arrowButtonInstance.getAllImages();

        for (let i = 0; i < arrowButtonsHTML.length; i++) {
            const arrowButton = new ArrowButton(arrowButtonsHTML[i], imagesConnectedWithArrowButtons[i]);
            arrowButtonsObjects.push(arrowButton);
        }
    }
}

const main = new Main();
