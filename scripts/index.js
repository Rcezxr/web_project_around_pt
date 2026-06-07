import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Seletores gerais
const cardsList = document.querySelector(".cards__list");
const openEditButton = document.querySelector(".profile__edit-button");
const openAddButton = document.querySelector(".profile__add-button");

// Validação
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_error",
};

const profileForm = document.querySelector("#edit-profile-form");
const addCardForm = document.querySelector("#new-card-form");

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

profileFormValidator.setEventListeners();
addCardFormValidator.setEventListeners();

// --- UserInfo ---
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

// --- PopupWithImage ---
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

// --- PopupWithForm de edição de perfil ---
const popupWithEditForm = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    about: inputValues.description,
  });
  popupWithEditForm.close();
});
popupWithEditForm.setEventListeners();

// --- PopupWithForm de nova carta ---
const popupWithAddForm = new PopupWithForm("#new-card-popup", (inputValues) => {
  section.addItem(createCard(inputValues.name, inputValues.link));
  popupWithAddForm.close();
  addCardForm.reset();
  addCardFormValidator.resetValidation();
});
popupWithAddForm.setEventListeners();

// --- Card ---
function createCard(name, link) {
  const card = new Card(name, link, "#card__template", (cardName, cardLink) => {
    popupWithImage.open(cardLink, cardName);
  });
  return card.generateCard();
}

// --- Section ---
const section = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      section.addItem(createCard(card.name, card.link));
    },
  },
  ".cards__list",
);
section.renderItems();

// --- Botões de abrir popup ---
openEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileForm.querySelector(".popup__input_type_name").value = userData.name;
  profileForm.querySelector(".popup__input_type_description").value =
    userData.about;
  profileFormValidator.resetValidation();
  addCardFormValidator.resetValidation();
  popupWithEditForm.open();
});

openAddButton.addEventListener("click", () => {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  popupWithAddForm.open();
});
