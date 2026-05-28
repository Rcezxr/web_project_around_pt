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

const popups = document.querySelectorAll(".popup");
const openEditButton = document.querySelector(".profile__edit-button");
const openPopup = document.querySelector("#edit-popup");
const closePopup = document.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.querySelector("#edit-profile-form");
const cardTemplate = document.querySelector("#card__template").content;
const cardsList = document.querySelector(".cards__list");

//Criando popup para adicionar novas cartas
const openAddButton = document.querySelector(".profile__add-button");
const openAddPopup = document.querySelector("#new-card-popup");
const closeAddPopup = openAddPopup.querySelector(".popup__close");
const nameCard = document.querySelector(".popup__input_type_card-name");
const linkCard = document.querySelector(".popup__input_type_url");
const addCardForm = document.querySelector("#new-card-form");

//abrindo imagem
const openImg = document.querySelector("#image-popup");
const contentImg = openImg.querySelector(".popup__content_content_image");
const popupCaption = openImg.querySelector(".popup__caption");
const popupImg = openImg.querySelector(".popup__image");
const closeImg = openImg.querySelector(".popup__close");

//save button do perfil
const saveButton = document.querySelector(".popup__button");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);
const nameError = document.querySelector("#name-error");
const descriptionError = document.querySelector("#description-error");

//save button do new card
const saveCardButton = addCardForm.querySelector(".popup__button");
const newCardNameInput = document.querySelector(".popup__input_type_card-name");
const newCardLinkInput = document.querySelector(".popup__input_type_url");
const newCardNameError = document.querySelector("#card-name-error");
const newCardLinkError = document.querySelector("#link-error");

const allInputs = document.querySelectorAll(".popup__input");

//colocando os inputs em um só evento para evitar repetição de código
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(nameInput, nameError);
    saveButton.disabled = !(
      nameInput.validity.valid && descriptionInput.validity.valid
    );
    checkInputValidity(descriptionInput, descriptionError);
    saveButton.disabled = !(
      nameInput.validity.valid && descriptionInput.validity.valid
    );
    checkInputValidity(newCardNameInput, newCardNameError);
    saveCardButton.disabled = !(
      newCardNameInput.validity.valid && newCardLinkInput.validity.valid
    );
    checkInputValidity(newCardLinkInput, newCardLinkError);
    saveCardButton.disabled = !(
      newCardNameInput.validity.valid && newCardLinkInput.validity.valid
    );
  });
});

function fillProfileForm(profileData) {
  const nameInput = document.querySelector(".popup__input_type_name");
  const descriptionInput = document.querySelector(
    ".popup__input_type_description",
  );
  nameInput.value = profileData.name;
  descriptionInput.value = profileData.description;
}

function handleOpenEditModal() {
  const profileData = {
    name: profileTitle.textContent,
    description: profileDescription.textContent,
  };
  fillProfileForm(profileData);
  resetErrors();
  openPopup.classList.add("popup_is-opened");
}

function checkInputValidity(input, errorSpan) {
  if (input.validity.valueMissing) {
    if (input.type === "url") {
      errorSpan.textContent = "insira uma url válida.";
    } else {
      errorSpan.textContent = "por favor, preencha este campo.";
    }
  } else if (input.validity.tooShort) {
    errorSpan.textContent = `Aumente o texto para pelo menos ${input.minLength} caracteres ou mais.`;
  } else if (input.validity.typeMismatch) {
    errorSpan.textContent = "insira uma url válida.";
  } else {
    errorSpan.textContent = "";
  }
  if (input.validity.valid) {
    input.classList.remove("popup__input_error");
  } else {
    input.classList.add("popup__input_error");
  }
}
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector(".popup__input_type_name");
  const descriptionInput = document.querySelector(
    ".popup__input_type_description",
  );
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  openPopup.classList.remove("popup_is-opened");
});

openEditButton.addEventListener("click", handleOpenEditModal);

closePopup.addEventListener("click", () => {
  openPopup.classList.remove("popup_is-opened");
  resetErrors();
});

closeImg.addEventListener("click", () => {
  openImg.classList.remove("popup_is-opened");
});

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.classList.remove("popup_is-opened");
      addCardForm.reset();
     resetErrors();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_is-opened");
      addCardForm.reset();
     resetErrors();
    }
  }
});

function resetErrors() {
  nameError.textContent = "";
  descriptionError.textContent = "";
  newCardNameError.textContent = "";
  newCardLinkError.textContent = "";
  nameInput.classList.remove("popup__input_error");
  descriptionInput.classList.remove("popup__input_error");
  newCardNameInput.classList.remove("popup__input_error");
  newCardLinkInput.classList.remove("popup__input_error");
  saveButton.disabled = true;
  saveCardButton.disabled = true;
}
/*function resetFormErrors() {
  newCardNameError.textContent = "";
  newCardLinkError.textContent = "";
  newCardNameInput.classList.remove("popup__input_error");
  newCardLinkInput.classList.remove("popup__input_error");
}

function resetProfileFormErrors() {
  nameError.textContent = "";
  descriptionError.textContent = "";
  nameInput.classList.remove("popup__input_error");
  descriptionInput.classList.remove("popup__input_error");
  saveButton.disabled = !(
    nameInput.validity.valid && descriptionInput.validity.valid
  );
}
  */

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  //funcionalidade para like
  const clickLike = cardElement.querySelector(".card__like-button");
  //funcionalidade para deletar o card
  const deleteCard = cardElement.querySelector(".card__delete-button");
  const cardLi = cardElement.querySelector(".card");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  clickLike.addEventListener("click", () => {
    clickLike.classList.toggle("card__like-button_is-active");
  });

  deleteCard.addEventListener("click", () => {
    cardLi.remove();
  });

  cardImage.addEventListener("click", () => {
    popupCaption.textContent = name;
    popupImg.src = link;
    popupImg.alt = name;
    openImg.classList.add("popup_is-opened");
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link, container);
  container.prepend(cardElement);
  return cardElement;
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

// Adicionando funcionalidade para abrir o popup de adicionar nova carta

openAddButton.addEventListener("click", () => {
  openAddPopup.classList.add("popup_is-opened");
});
closeAddPopup.addEventListener("click", () => {
  openAddPopup.classList.remove("popup_is-opened");
  addCardForm.reset();
 resetErrors();
});

function handleCardFormSubmit(event) {
  event.preventDefault();
  const nameCard = document.querySelector(".popup__input_type_card-name");
  const linkCard = document.querySelector(".popup__input_type_url");

  renderCard(nameCard.value, linkCard.value, cardsList);
  openAddPopup.classList.remove("popup_is-opened");
  addCardForm.reset();
 resetErrors();
}

addCardForm.addEventListener("submit", handleCardFormSubmit);
