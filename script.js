const Cat = () => {
  let name = "";
  let imagePath = "";
  let clickCounter = 0;

  return {
    getName: () => {
      return name;
    },
    setName: catName => {
      name = catName;
    },
    getImagePath: () => {
      return imagePath;
    },
    setImagePath: path => {
      imagePath = path;
    },
    getClickCounter: () => {
      return clickCounter;
    },
    setClickCounter: catClickCounter => {
      clickCounter = catClickCounter;
    }
  };
};

const CatDAO = numberOfCats => {
  let cats = [];

  return {
    loadCats: () => {
      for (let index = 1; index <= numberOfCats; index++) {
        const newCat = Cat();
        newCat.setName(`Cat ${index}`);
        newCat.setImagePath(`./assets/cat-${index}.jpg`);
        cats.push(newCat);
      }
      return cats;
    },
    updateCatClickCounter: name => {
      cats.map(cat => {
        let currentCounter = cat.getClickCounter();
        if (cat.getName() === name) {
          currentCounter += 1;
          cat.setClickCounter(currentCounter);
        }
      });
    }
  };
};

const CatController = () => {
  const catDAO = CatDAO(6);
  const catView = CatView();

  return {
    getCats: () => {
      return catDAO.loadCats();
    },
    incrementCatClickCounter: catName => {
      catDAO.updateCatClickCounter(catName);
    },
    init: () => {
      catView.init();
    }
  };
};

const CatView = () => {
  const createImageElement = imagePath => {
    const img = document.createElement("img");
    img.src = imagePath;
    img.className = "cat-clicker";
    return img;
  };

  const createImageDisplay = cat => {
    const catDisplay = document.querySelector("div.cat-image-display");
    catDisplay.innerHTML = "";

    const catDisplayName = document.createElement("p");
    catDisplayName.innerHTML = cat.getName();

    const catDisplayImage = createImageElement(cat.getImagePath());
    catDisplayImage.addEventListener("click", () => {
      catController.incrementCatClickCounter(cat.getName());
      const clickCounterDisplay = document.querySelector(
        "div.cat-image-display span"
      );
      clickCounterDisplay.innerHTML = `Number of clicks: ${cat.getClickCounter()}`;
    });

    const clickCounterDisplay = document.createElement("span");
    clickCounterDisplay.innerHTML = `Number of clicks: ${cat.getClickCounter()}`;

    catDisplay.appendChild(catDisplayName);
    catDisplay.appendChild(catDisplayImage);
    catDisplay.appendChild(clickCounterDisplay);
  };

  return {
    init: () => {
      const catNavigationBar = document.querySelector("div.thumbnail-display");
      const cats = catController.getCats();

      cats.forEach(cat => {
        const catThumbImage = createImageElement(cat.getImagePath());

        catThumbImage.addEventListener("click", () => {
          createImageDisplay(cat);
        });

        catNavigationBar.appendChild(catThumbImage);
      });
    }
  };
};

const catController = CatController();
catController.init();
