"use strict";
// Получаем данные со страницы ================================================
const db = JSON.parse(localStorage.getItem("Garage")) || [];

const btnAdd = document.querySelector(".add__ad"),
  modalAdd = document.querySelector(".modal__add"),
  modalItem = document.querySelector(".modal__item"),
  modalClose = document.querySelector(".modal__close"),
  modalBtnSubmit = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  modalBtnWarning = document.querySelector(".modal__btn-warning"),
  modalFileInput = document.querySelector(".modal__file-input"),
  modalFileBtn = document.querySelector(".modal__file-btn"),
  modalImageAdd = document.querySelector(".modal__image-add"),
  modalDescription = document.querySelector(".modal__description"),
  modalContent = document.querySelector(".modal__content"),
  catalog = document.querySelector(".catalog"),
  card = document.querySelector(".card");

const srcModalImg = modalImageAdd.src,
  textFileBtn = modalFileBtn.textContent;

const elementsModalSubmit = [...modalSubmit.elements].filter(
  (elem) => elem.tagName !== "BUTTON"
);

const infoPhoto = {};

// Объявление функций =======================================================

const saveDb = () => localStorage.setItem("Garage", JSON.stringify(db));

const downloadPhoto = (event) => {
  const target = event.target;
  const reader = new FileReader();
  const file = target.files[0];

  infoPhoto.fileName = file.name;
  infoPhoto.fileSize = file.size;

  reader.readAsBinaryString(file);
  reader.addEventListener("load", (event) => {
    if (infoPhoto.fileSize < 250000) {
      modalFileBtn.textContent = infoPhoto.fileName;
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
    } else {
      modalFileBtn.textContent = "Файл не должен превышать 200кб";
      modalFileInput.value = "";
      checkForm();
    }
  });
};

const openModalAdd = () => {
  if (modalAdd.classList.contains("hide")) {
    modalAdd.classList.remove("hide");
    modalBtnSubmit.disabled = true;
    document.addEventListener("keydown", closeModal);
  }
};

const openModalItem = (event) => {
  const target = event.target.closest(".card");

  const itemId = target.id;

  console.log(db[itemId]);

  if (target) {
    modalItem.textContent = "";

    modalItem.insertAdjacentHTML(
      "beforeEnd",
      `
      <div class="modal__block">
        <h2 class="modal__header">Купить</h2>
        <div class="modal__content">
          <div>
            <img
              class="modal__image modal__image-item"
              src="data:image/jpeg;base64,${db[itemId].image}"
              alt="test"
            />
          </div>
         <div class="modal__description">
             <h3 class="modal__header-item">${db[itemId].nameItem}</h3>
            <p>Состояние: <span class="modal__status-item">${db[itemId].status}</span></p>
            <p>
              Описание:
              <span class="modal__description-item"
                >${db[itemId].descriptionItem}</span
              >
            </p>
            <p>Цена: <span class="modal__cost-item">${db[itemId].costItem}</span></p>
            <button class="btn">Купить</button> 
          </div>
        </div>
        <button class="modal__close">&#10008;</button>
      </div>
    `
    );

    modalItem.classList.remove("hide");
    document.addEventListener("keydown", closeModal);
  }
};

const closeModal = (event) => {
  const target = event.target;

  if (
    target.closest(".modal__close") ||
    target.classList.contains("modal") ||
    event.code === "Escape"
  ) {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    document.removeEventListener("keydown", closeModal);
    modalSubmit.reset();

    modalImageAdd.src = srcModalImg;
    modalFileBtn.textContent = textFileBtn;
    checkForm();
  }
};

const checkForm = () => {
  const validForm = elementsModalSubmit.every((elem) => elem.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? "none" : "";
};

const renderCard = () => {
  catalog.textContent = "";

  db.forEach((item, i) => {
    catalog.insertAdjacentHTML(
      "beforeend",
      `
    <li class="card" id="${i}">
        <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test" />
        <div class="card__description">
            <h3 class="card__header">${item.nameItem}</h3>
            <div class="card__price">${item.costItem}</div>
        </div>
    </li>`
    );
  });
};

// Обработчик событий =========================================================

btnAdd.addEventListener("click", openModalAdd);
catalog.addEventListener("click", openModalItem);
modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);
modalSubmit.addEventListener("input", checkForm);

modalSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemObject = {};
  for (const elem of elementsModalSubmit) {
    itemObject[elem.name] = elem.value;
  }
  itemObject.image = infoPhoto.base64;
  db.push(itemObject);
  closeModal({ target: modalAdd });
  saveDb();
  renderCard();
});

modalFileInput.addEventListener("change", downloadPhoto);

// Вызов функций ==============================================================

renderCard();
