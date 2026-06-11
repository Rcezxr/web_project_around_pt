import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Api } from "./api.js";
import { PopupWithConfirmation } from "./popupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "cda2d22c-92d8-4e97-a00b-bc65268fa00c",
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
const openAvatarButton = document.querySelector(".profile__avatar-edit");

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

// --- PopupWithConfirmation ---
const popupWithConfirmation = new PopupWithConfirmation("#confirmation-popup");
popupWithConfirmation.setEventListeners();

// --- PopupWithForm de edição de perfil ---
const popupWithEditForm = new PopupWithForm("#edit-popup", (inputValues) => {
  popupWithEditForm.renderLoading(true);
  api
    .editProfile(inputValues.name, inputValues.description)
    .then((user) => {
      userInfo.setUserInfo({ name: user.name, about: user.about });
      popupWithEditForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupWithEditForm.renderLoading(false));
});

popupWithEditForm.setEventListeners();
const avatarForm = document.querySelector("#avatar-form");
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.setEventListeners();

const popupWithAvatarForm = new PopupWithForm(
  "#avatar-popup",
  (inputValues) => {
    popupWithAvatarForm.renderLoading(true);
    api
      .updateAvatar(inputValues.avatar)
      .then((user) => {
        document.querySelector(".profile__image").src = user.avatar;
        popupWithAvatarForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupWithAvatarForm.renderLoading(false));
  },
);
popupWithAvatarForm.setEventListeners();

// --- PopupWithForm de nova carta ---
const popupWithAddForm = new PopupWithForm("#new-card-popup", (inputValues) => {
  popupWithAddForm.renderLoading(true);
  api
    .addCard(inputValues["place-name"], inputValues.link)
    .then((card) => {
      section.addItem(
        createCard(
          card.name,
          card.link,
          card._id,
          card.isLiked,
          card.owner,
          card.owner,
        ),
      );
      popupWithAddForm.close();
      addCardForm.reset();
      addCardFormValidator.resetValidation();
    })
    .catch((err) => console.log(err))
    .finally(() => popupWithAddForm.renderLoading(false));
});
popupWithAddForm.setEventListeners();

// --- Card ---
function createCard(name, link, id, isLiked, owner, userId) {
  const card = new Card(
    name,
    link,
    "#card__template",
    (cardName, cardLink) => {
      popupWithImage.open(cardLink, cardName);
    },
    id,
    isLiked,
    (cardId) => {
      popupWithConfirmation.open(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            popupWithConfirmation.close();
          })
          .catch((err) => console.log(err));
      });
    },
    (isLiked, cardId) => {
      const likeMethod = isLiked ? api.unlikeCard : api.likeCard;
      likeMethod
        .call(api, cardId)
        .then((updatedCard) => {
          card.setLike(updatedCard.isLiked);
        })
        .catch((err) => console.log(err));
    },
  );
  if (owner !== userId) {
    // ← adicione aqui
    card.hideDeleteButton();
  }
  return card.generateCard();
}

let section;

api
  .getAllData()
  .then(([user, cards]) => {
    userInfo.setUserInfo({ name: user.name, about: user.about });
    document.querySelector(".profile__image").src = user.avatar;
    section = new Section(
      {
        items: cards,
        renderer: (card) => {
          section.addItem(
            createCard(
              card.name,
              card.link,
              card._id,
              card.isLiked,
              card.owner,
              user._id,
            ),
          );
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
openAvatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  popupWithAvatarForm.open();
});
