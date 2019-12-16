// RESOURCE --------------------------------------------------------------------

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

// MODEL -----------------------------------------------------------------------

const CatModel = numberOfCats => {
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
    incrementCatClickCounter: name => {
      cats.map(cat => {
        if (cat.getName() === name) {
          const currentCounter = cat.getClickCounter();
          cat.setClickCounter(currentCounter + 1);
        }
      });
    }
  };
};

// CONTROLLER ------------------------------------------------------------------

const CatController = () => {
  const catModel = CatModel(6);

  return {
    getCats: () => {
      return catModel.loadCats();
    },
    incrementCatClickCounter: catName => {
      catModel.incrementCatClickCounter(catName);
    },
    init: () => {
      CatThumbnailView().createThumbnailDisplayList();
    }
  };
};

// VIEW ------------------------------------------------------------------------

const createImageElement = imagePath => {
  const img = document.createElement("img");
  img.src = imagePath;
  img.className = "cat-clicker";
  return img;
};

const CatThumbnailView = () => {
  return {
    createThumbnailDisplayList: () => {
      const catNavigationBar = document.querySelector("div.thumbnail-display");
      const cats = catController.getCats();

      cats.forEach(cat => {
        const catThumbImage = createImageElement(cat.getImagePath());

        catThumbImage.addEventListener("click", () => {
          CatView().createMainImageDisplay(cat);
        });

        catNavigationBar.appendChild(catThumbImage);
      });
    }
  };
};

const CatView = () => {
  return {
    createMainImageDisplay: cat => {
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
    }
  };
};

const catController = CatController();
catController.init();
