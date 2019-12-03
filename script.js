const catPituresAmount = 6;

let catsCounter = [];

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
  catsCounter.push(0);

  const catThumbImage = createImageElement(currentFileName);
  catThumbImage.addEventListener("click", () => {
    imageDisplay.innerHTML = "";
    const catName = document.createElement("p");
    catName.innerHTML = `Cat ${index + 1}`;

    const catImage = createImageElement(currentFileName);
    catImage.addEventListener("click", () => {
      catsCounter[index] += 1;
      const counterDisplay = document.querySelector(
        "div.cat-image-display span"
      );
      counterDisplay.innerHTML = `Number of clicks: ${catsCounter[index]}`;
    });

    const span = document.createElement("span");
    span.innerHTML = `Number of clicks: ${catsCounter[index]}`;

    imageDisplay.appendChild(catName);
    imageDisplay.appendChild(catImage);
    imageDisplay.appendChild(span);
  });

  navbar.appendChild(catThumbImage);
}
