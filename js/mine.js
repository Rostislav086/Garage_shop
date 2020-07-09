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
  catalog = document.querySelector(".catalog"),
  card = document.querySelector(".card");

const elementsModalSubmit = [...modalSubmit.elements].filter(
  elem => elem.tagName !== "BUTTON"
);

// Объявление функций =======================================================

const saveDb = () => localStorage.setItem("Garage", JSON.stringify(db));
console.log(db);

const openModalAdd = () => {
  if (modalAdd.classList.contains("hide")) {
    modalAdd.classList.remove("hide");
    modalBtnSubmit.disabled = true;
    document.addEventListener("keydown", closeModal);
  }
};

const openModalItem = event => {
  const target = event.target;

  if (target.closest(".card")) {
    modalItem.classList.remove("hide");
    document.addEventListener("keydown", closeModal);
  }
};

const closeModal = event => {
  const target = event.target;

  if (
    target.closest(".modal__close") ||
    target.classList.contains("modal") ||
    event.code === "Escape"
  ) {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    modalSubmit.reset();
    document.removeEventListener("keydown", closeModal);
    checkForm();
  }
};

const checkForm = () => {
  const validForm = elementsModalSubmit.every(elem => elem.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? "none" : "";
};

// Вызов функций ==============================================================

// Обработчик событий =========================================================

btnAdd.addEventListener("click", openModalAdd);
catalog.addEventListener("click", openModalItem);
modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);
modalSubmit.addEventListener("input", checkForm);

modalSubmit.addEventListener("submit", event => {
  event.preventDefault();
  const itemObject = {};
  for (const elem of elementsModalSubmit) {
    itemObject[elem.name] = elem.value;
  }
  db.push(itemObject);
  closeModal({ target: modalAdd });
  saveDb(itemObject);
});
