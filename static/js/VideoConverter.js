export default class VideoConverter {
  static #instance;
  static getInstance() {
    if (!VideoConverter.#instance)
      VideoConverter.#instance = new VideoConverter();
    return VideoConverter.#instance;
  }
  convert(videoUrl) {
    const container = document.createElement("div");
    container.className = "ratio ratio-16x9";
    container.style.marginTop = "2rem";
    const iframe = document.createElement("iframe");
    iframe.src = `${videoUrl}`;
    iframe.title = "YouTube video player";
    iframe.allowFullscreen = true;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    container.appendChild(iframe);
    return container;
  }
}
