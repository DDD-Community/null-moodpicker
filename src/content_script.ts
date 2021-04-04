chrome.runtime.onMessage.addListener(({ isPickMode }) => {
  if (isPickMode) {
    document.body.addEventListener("click", pickImage);
    return;
  }
  document.body.removeEventListener("click", pickImage);
});

const pickImage = (event: MouseEvent) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
    event.stopPropagation();

    alert(event.target.src);
  }
};
