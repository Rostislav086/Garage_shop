"use strict";

const modalAdd = document.querySelector(".modal__add"),
  modalItem = document.querySelector(".modal__item"),
  modalClose = document.querySelector(".modal__close"),
  btnAdd = document.querySelector(".add__ad"),
  card = document.querySelector(".card"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog");

// Объявляем функции ==========================================================

const openModalAdd = () => {
  modalAdd.classList.remove("hide");
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
  console.log(event);

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

// обработчики событий  =======================================================

btnAdd.addEventListener("click", openModalAdd);
catalog.addEventListener("click", openModalItem);
modalItem.addEventListener("click", closeModal);
modalAdd.addEventListener("click", closeModal);
