"use strict";

const itemObject = {};

const modalAdd = document.querySelector(".modal__add"),
  modalItem = document.querySelector(".modal__item"),
  modalClose = document.querySelector(".modal__close"),
  btnAdd = document.querySelector(".add__ad"),
  card = document.querySelector(".card"),
  modalSubmit = document.querySelector(".modal__submit"),
  modalBtnSubmit = document.querySelector(".modal__btn-submit"),
  catalog = document.querySelector(".catalog");

const elementSubmitForm = [...modalSubmit.elements].filter(
  (elem) => elem.tagName !== "BUTTON"
);

console.log(elementSubmitForm);

// Объявляем функции ==========================================================

const openModalAdd = () => {
  modalAdd.classList.remove("hide");

  modalBtnSubmit.disabled = true;

  document.addEventListener("keydown", closeModal);
};

const openModalItem = (event) => {
  const target = event.target;

  if (target.closest(".card")) {
    modalItem.classList.remove("hide");
    document.addEventListener("keydown", closeModal);
  }
};

const closeModal = function (event) {
  const target = event.target;

  if (
    target.classList.contains("modal__close") ||
    target == this ||
    event.code === "Escape"
  ) {
    if (modalAdd) {
      modalAdd.classList.add("hide");
      modalSubmit.reset();
      document.removeEventListener("keydown", closeModal);
    }
    modalItem.classList.add("hide");
    document.removeEventListener("keydown", closeModal);
  }
};

const validForm = () => {
  const validForm = elementSubmitForm.every((elem) => console.log(elem.value));
};
// обработчики событий  =======================================================

btnAdd.addEventListener("click", openModalAdd);
catalog.addEventListener("click", openModalItem);
modalItem.addEventListener("click", closeModal);
modalAdd.addEventListener("click", closeModal);
modalSubmit.addEventListener("input", validForm);
