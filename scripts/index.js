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
initialCards.forEach((card) => {
  console.log(card.name);
});

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
  openPopup.classList.add("popup_is-opened");
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
});

closeImg.addEventListener("click", () => {
  openImg.classList.remove("popup_is-opened");
});

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
  //abrindo imagem

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
  container.append(cardElement);
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
});

function handleCardFormSubmit(event) {
  event.preventDefault();
  const nameCard = document.querySelector(".popup__input_type_card-name");
  const linkCard = document.querySelector(".popup__input_type_url");

  renderCard(nameCard.value, linkCard.value, cardsList);
  openAddPopup.classList.remove("popup_is-opened");
  addCardForm.reset();
}

addCardForm.addEventListener("submit", handleCardFormSubmit);
