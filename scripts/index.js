import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Api } from "./api.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "f4d7091e-146c-4f2d-89dc-1be6bf4e0697",
    "Content-Type": "application/json",
  },
});
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
  api
    .editProfile(inputValues.name, inputValues.description)
    .then((user) => {
      userInfo.setUserInfo({ name: user.name, about: user.about });
      popupWithEditForm.close();
    })
    .catch((err) => console.log(err));
});
popupWithEditForm.setEventListeners();

// --- PopupWithForm de nova carta ---
const popupWithAddForm = new PopupWithForm("#new-card-popup", (inputValues) => {
  api
    .addCard(inputValues.name, inputValues.link)
    .then((card) => {
      section.addItem(createCard(card.name, card.link));
      popupWithAddForm.close();
      addCardForm.reset();
      addCardFormValidator.resetValidation();
    })
    .catch((err) => console.log(err));
});
popupWithAddForm.setEventListeners();

// --- Card ---
function createCard(name, link) {
  const card = new Card(name, link, "#card__template", (cardName, cardLink) => {
    popupWithImage.open(cardLink, cardName);
  });
  return card.generateCard();
}

let section;

api
  .getAllData()
  .then(([user, cards]) => {
    userInfo.setUserInfo({ name: user.name, about: user.about });

    section = new Section(
      {
        items: cards,
        renderer: (card) => {
          section.addItem(createCard(card.name, card.link));
        },
      },
      ".cards__list",
    );
    section.renderItems();
  })
  .catch((err) => console.log(err));

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
