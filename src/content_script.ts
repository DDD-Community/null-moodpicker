chrome.runtime.onMessage.addListener(({ isPickMode }) => {
  if (isPickMode) {
    document.body.addEventListener("click", pickImage);
    return;
  }
  document.body.removeEventListener("click", pickImage);
});

let timer: NodeJS.Timeout | null;

const pickImage = (event: MouseEvent) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
    event.stopPropagation();
    if (!timer) {
      const imageTarget = event.target as HTMLImageElement;
      timer = setTimeout(() => {
        timer = null;

        const imageElement = document.createElement("img");
        imageElement.src = imageTarget.src;

        const style = imageElement.style;

        style.position = "fixed";
        style.zIndex = "50";
        style.right = "0";
        style.top = "0";
        style.margin = "0.5rem";
        style.maxWidth = "10rem";
        style.maxHeight = "8rem";
        style.border = "0.3rem solid black";
        style.borderRadius = "0.5rem";

        fadeIn(imageElement, slideOut);

        document.body.appendChild(imageElement);

      }, 500);
    }
  }
}

const fadeIn = (element: HTMLImageElement, callback: (it: HTMLImageElement) => void) => {
  const ms = 600;
  const finishFadeIn = () => {
    element.removeEventListener("transitionend", finishFadeIn);
    setTimeout(() => callback(element), 2000);
  };
  element.style.transition = "opacity 0s";
  element.style.display = "";
  element.style.opacity = "0";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.addEventListener("transitionend", finishFadeIn);
      element.style.transition = `opacity ${ms / 1000}s`;
      element.style.opacity = "1"
    });
  });
};

const slideOut = (element: HTMLImageElement) => {
  let marginValue = 0.5;
  let fps = 120;
  const moveRight = () => {
    setTimeout(() => {
      marginValue -= 0.4;
      element.style.marginRight = marginValue + "rem";
      requestAnimationFrame(moveRight);
    }, 1000 / fps);
  }
  requestAnimationFrame(moveRight);
}

