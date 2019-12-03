const catPituresAmount = 6;

const makeCounter = () => {
  let counter = 0;

  function add(value) {
    counter += value;
  }

  return {
    incrementBy: value => {
      add(value);
    },
    counterValue: () => {
      return counter;
    }
  };
};

const navbar = document.querySelector("div.thumbnail-display");
const imageDisplay = document.querySelector("div.cat-image-display");

const createImageElement = fileName => {
  const img = document.createElement("img");
  img.src = `./assets/${fileName}`;
  img.className = "cat-clicker";
  return img;
};

for (let index = 0; index < catPituresAmount; index++) {
  let currentFileName = `cat-${index + 1}.jpg`;
  let catCounter = makeCounter();

  const catThumbImage = createImageElement(currentFileName);
  catThumbImage.addEventListener("click", () => {
    imageDisplay.innerHTML = "";
    const catName = document.createElement("p");
    catName.innerHTML = `Cat ${index + 1}`;

    const catImage = createImageElement(currentFileName);
    catImage.addEventListener("click", () => {
      catCounter.incrementBy(1);
      const counterDisplay = document.querySelector(
        "div.cat-image-display span"
      );
      counterDisplay.innerHTML = `Number of clicks: ${catCounter.counterValue()}`;
    });

    const span = document.createElement("span");
    span.innerHTML = `Number of clicks: ${catCounter.counterValue()}`;

    imageDisplay.appendChild(catName);
    imageDisplay.appendChild(catImage);
    imageDisplay.appendChild(span);
  });

  navbar.appendChild(catThumbImage);
}
