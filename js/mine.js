"use strict";
// Получаем данные со страницы ================================================

const btnAdd = document.querySelector(".add__ad"),
  modalAdd = document.querySelector(".modal__add"),
  modalItem = document.querySelector(".modal__item"),
  modalClose = document.querySelector(".modal__close"),
  modalBtnSubmit = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  card = document.querySelector(".card");

// Объявление функций =======================================================

const openModalAdd = () => {
  if (modalAdd.classList.contains("hide")) {
    modalAdd.classList.remove("hide");
    modalBtnSubmit.disabled = true;
  }
};

const openModalItem = () => {
  modalItem.classList.remove("hide");
};

const closeModalItem = event => {
  const target = event.target;

  if (
    target.classList.contains("modal__close") ||
    target === modalItem ||
    event.keyCode === 27
  ) {
    modalItem.classList.add("hide");
  }
};

const closeModalAdd = event => {
  const target = event.target;

  if (
    target.classList.contains("modal__close") ||
    target === modalAdd ||
    event.keyCode === 27
  ) {
    modalAdd.classList.add("hide");
    modalSubmit.reset();
  }
};

// Вызов функций ==============================================================

// Обработчик событий =========================================================

btnAdd.addEventListener("click", openModalAdd);
modalAdd.addEventListener("click", closeModalAdd);
card.addEventListener("click", openModalItem);
modalItem.addEventListener("click", closeModalItem);
document.addEventListener("keydown", closeModalAdd);
document.addEventListener("keydown", closeModalItem);

document.addEventListener("click", event => {
  console.log(event.target);
});
