export default class ImageHandler {
    constructor() {}

    zoomImageInit(){
        const images = document.querySelectorAll('.project-img');
        const fullscreenView = document.getElementById('fullscreen-view');
        const fullscreenImage = document.getElementById('fullscreen-image');
        

        images.forEach(image => {
            image.addEventListener('click', () => {
                fullscreenImage.src = image.src;
                fullscreenView.classList.add('active');
            });
        });

        fullscreenView.addEventListener('click', () => {
            fullscreenView.classList.remove('active');
        });
    }
}




    
    
  

   

  