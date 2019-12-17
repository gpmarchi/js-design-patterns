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
  let currentSelectedCat;

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
    incrementCatClickCounter: () => {
      const currentCounter = currentSelectedCat.getClickCounter();
      currentSelectedCat.setClickCounter(currentCounter + 1);
    },
    getCurrentSelectedCat: () => {
      return currentSelectedCat;
    },
    setCurrentSelectedCat: cat => {
      currentSelectedCat = cat;
    },
    updateCurrentSelectedCat: updatedCat => {
      currentSelectedCat.setName(updatedCat.getName());
      currentSelectedCat.setImagePath(updatedCat.getImagePath());
      currentSelectedCat.setClickCounter(updatedCat.getClickCounter());
    }
  };
};

// CONTROLLER ------------------------------------------------------------------

const CatController = () => {
  const catModel = CatModel(6);
  const catThumbnailView = CatThumbnailView();

  return {
    getCats: () => {
      return catModel.loadCats();
    },
    getSelectedCat: () => {
      return catModel.getCurrentSelectedCat();
    },
    setSelectedCat: cat => {
      catModel.setCurrentSelectedCat(cat);
    },
    incrementCatClickCounter: () => {
      catModel.incrementCatClickCounter();
    },
    updateCurrentSelectedCat: updatedCat => {
      catModel.updateCurrentSelectedCat(updatedCat);
    },
    init: () => {
      catThumbnailView.renderThumbnailList();
    }
  };
};

// VIEWS -----------------------------------------------------------------------

// HELPER FUNTION --------------------------------------------------------------
const createImageElement = imagePath => {
  const img = document.createElement("img");
  img.src = imagePath;
  img.className = "cat-clicker";
  return img;
};

// NAVBAR ----------------------------------------------------------------------
const CatThumbnailView = () => {
  const editForm = document.querySelector("footer.form-container");

  return {
    renderThumbnailList: () => {
      const catNavigationBar = document.querySelector("div.thumbnail-display");
      const cats = catController.getCats();

      cats.forEach(cat => {
        const catThumbImage = createImageElement(cat.getImagePath());

        catThumbImage.addEventListener("click", () => {
          editForm.style.display = "none";
          catController.setSelectedCat(cat);
          CatDisplayView().renderMainImageDisplay();
        });

        catNavigationBar.appendChild(catThumbImage);
      });
    }
  };
};

// EDIT FORM -------------------------------------------------------------------
const CatEditFormView = () => {
  const selectedCat = catController.getSelectedCat();

  const editForm = document.querySelector("footer.form-container");
  editForm.addEventListener("submit", event => {
    event.preventDefault();
  });

  const [catNameInput, catImageURL, catClicks] = editForm.querySelectorAll(
    "form input"
  );

  const cancelButton = editForm.querySelector("form button#cancel");
  cancelButton.addEventListener("click", () => {
    editForm.style.display = "none";
  });

  const saveButton = editForm.querySelector("form button#save");
  saveButton.addEventListener("click", () => {
    const updatedCat = Cat();
    updatedCat.setName(catNameInput.value);
    updatedCat.setImagePath(catImageURL.value);
    updatedCat.setClickCounter(parseInt(catClicks.value, 10));
    catController.updateCurrentSelectedCat(updatedCat);
    editForm.style.display = "none";
    CatDisplayView().renderMainImageDisplay();
  });

  return {
    showCatEditForm: () => {
      catNameInput.value = selectedCat.getName();
      catImageURL.value = selectedCat.getImagePath();
      catClicks.value = selectedCat.getClickCounter();
      editForm.style.display = "flex";
    }
  };
};

// MAIN DISPLAY ----------------------------------------------------------------
const CatDisplayView = () => {
  const selectedCat = catController.getSelectedCat();
  const catDisplay = document.querySelector("main.cat-image-display");

  const handleDisplayImageClick = () => {
    catController.incrementCatClickCounter();
    const catClickCounterDisplay = document.querySelector(
      "main.cat-image-display span"
    );
    catClickCounterDisplay.innerHTML = `Number of clicks: ${selectedCat.getClickCounter()}`;
  };

  const handleAdminButtonClick = () => {
    CatEditFormView().showCatEditForm();
  };

  return {
    renderMainImageDisplay: () => {
      catDisplay.innerHTML = "";

      const catDisplayName = document.createElement("p");
      catDisplayName.innerHTML = selectedCat.getName();

      const catDisplayImage = createImageElement(selectedCat.getImagePath());
      catDisplayImage.addEventListener("click", handleDisplayImageClick);

      const catClickCounterDisplay = document.createElement("span");
      catClickCounterDisplay.innerHTML = `Number of clicks: ${selectedCat.getClickCounter()}`;

      const adminButton = document.createElement("button");
      adminButton.addEventListener("click", handleAdminButtonClick);
      adminButton.innerHTML = "Admin";

      catDisplay.appendChild(catDisplayName);
      catDisplay.appendChild(catDisplayImage);
      catDisplay.appendChild(catClickCounterDisplay);
      catDisplay.appendChild(adminButton);
    }
  };
};

// START THE APP ---------------------------------------------------------------
const catController = CatController();
catController.init();
