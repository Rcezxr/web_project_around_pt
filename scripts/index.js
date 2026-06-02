import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, setOverlayClose } from "./utils.js";

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
const popups = document.querySelectorAll(".popup");
const cardsList = document.querySelector(".cards__list");

// Popup de edição de perfil
const openEditButton = document.querySelector(".profile__edit-button");
const openPopup = document.querySelector("#edit-popup");
const closePopup = openPopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.querySelector("#edit-profile-form");

// Popup de nova carta
const openAddButton = document.querySelector(".profile__add-button");
const openAddPopup = document.querySelector("#new-card-popup");
const closeAddPopup = openAddPopup.querySelector(".popup__close");
const addCardForm = document.querySelector("#new-card-form");

// Popup de imagem
const openImg = document.querySelector("#image-popup");
const popupCaption = openImg.querySelector(".popup__caption");
const popupImg = openImg.querySelector(".popup__image");
const closeImg = openImg.querySelector(".popup__close");

// Validação
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_error",
};

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

profileFormValidator.setEventListeners();
addCardFormValidator.setEventListeners();

// Fecha qualquer popup ao clicar no overlay
setOverlayClose(popups);

// --- Perfil ---

function fillProfileForm(profileData) {
  profileForm.querySelector(".popup__input_type_name").value = profileData.name;
  profileForm.querySelector(".popup__input_type_description").value =
    profileData.description;
}

function handleOpenEditModal() {
  fillProfileForm({
    name: profileTitle.textContent,
    description: profileDescription.textContent,
  });
  profileFormValidator.resetValidation();
  openModal(openPopup);
}

openEditButton.addEventListener("click", handleOpenEditModal);

closePopup.addEventListener("click", () => {
  closeModal(openPopup);
  profileFormValidator.resetValidation();
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = profileForm.querySelector(
    ".popup__input_type_name",
  ).value;
  profileDescription.textContent = profileForm.querySelector(
    ".popup__input_type_description",
  ).value;
  closeModal(openPopup);
});

// --- Imagem ---

closeImg.addEventListener("click", () => closeModal(openImg));

// --- Nova carta ---

function renderCard(name, link, container) {
  const cardElement = new Card(
    name,
    link,
    "#card__template",
    (cardName, cardLink) => {
      popupCaption.textContent = cardName;
      popupImg.src = cardLink;
      popupImg.alt = cardName;
      openModal(openImg);
    },
  );
  container.prepend(cardElement.generateCard());
}

openAddButton.addEventListener("click", () => openModal(openAddPopup));

closeAddPopup.addEventListener("click", () => {
  closeModal(openAddPopup);
  addCardForm.reset();
  addCardFormValidator.resetValidation();
});

function handleCardFormSubmit(event) {
  event.preventDefault();
  renderCard(
    addCardForm.querySelector(".popup__input_type_card-name").value,
    addCardForm.querySelector(".popup__input_type_url").value,
    cardsList,
  );
  closeModal(openAddPopup);
  addCardForm.reset();
  addCardFormValidator.resetValidation();
}

addCardForm.addEventListener("submit", handleCardFormSubmit);

// Renderiza os cards iniciais
initialCards.forEach((card) => renderCard(card.name, card.link, cardsList));
