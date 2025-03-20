import '../pages/index.css';

import { ServerConnection } from './server-connection.js';

function createCard (elem) {
    let newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    let cardTitle = newCard.querySelector('.card__title');
    let cardImage = newCard.querySelector('.card__image');
    let cardLike = newCard.querySelector('.card__like-button');
    let cardDelete = newCard.querySelector('.card__delete-button');
    let cardLikes = newCard.querySelector('.card__likes');


    cardLike.addEventListener('click', () => {
        if (cardLike.classList.contains('card__like-button_is-active')) {
            cardLike.classList.remove('card__like-button_is-active');
            ServerConnection.deleteLike(elem._id)
                .then((res) => res.json())
                .then((result) => {
                    cardLikes.textContent = result.likes.length;
                })
        } else {
            cardLike.classList.add('card__like-button_is-active');
            ServerConnection.addLike(elem._id)
                .then((res) => res.json())
                .then((result) => {
                    cardLikes.textContent = result.likes.length;
                })
        }
    });

    if (ServerConnection.ID == elem.owner._id) {
        cardDelete.addEventListener('click', (evt) => {
            ServerConnection.deleteCard(elem._id)
                .then((res) => res.json())
                .then((result) => {
                    if (result.message == 'Пост удалён') {
                        evt.target.closest('.card').remove()
                    } else {
                        console.log('что-то пошло не так')
                    }
                })
        });
    } else {
        newCard.removeChild(cardDelete);
    }

    if (elem.likes.length > 0) {
        elem.likes.forEach((person) => {
            if (person._id == ServerConnection.ID) {
                cardLike.classList.add('card__like-button_is-active');
            }
        })
    }

    cardImage.addEventListener('click', () => {
        imagePopupLink.src = elem['link'];
        imagePopupCaption.textContent = elem['name'];
        openModal(imagePopup);
    });

    cardTitle.textContent = elem['name'];
    cardImage.alt = elem['name'];
    cardImage.src = elem['link'];
    cardLikes.textContent = elem['likes'].length;
    return newCard;
};

const cardList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const profilePopupName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupDescription = profilePopup.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const cardPopup = document.querySelector('.popup_type_new-card');
const cardPopupName = cardPopup.querySelector('.popup__input_type_card-name');
const cardPopupURL = cardPopup.querySelector('.popup__input_type_url');

const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarPopupURL = avatarPopup.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupLink = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const cardTemplate = document.querySelector('#card-template').content;

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
avatarPopup.classList.add('popup_is-animated');


ServerConnection.getCards().then((result) => {
    result.forEach((elem) => cardList.append(createCard(elem)));
});

ServerConnection.getProfile().then((result) => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileAvatar.style.backgroundImage = `url('${result.avatar}')`;
})

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
    profilePopupName.value = profileName.textContent;
    profilePopupDescription.value = profileDescription.textContent;

    openModal(profilePopup);
});

const submitEditButton = profilePopup.querySelector('.popup__form');
submitEditButton.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitEditButton.querySelector('.popup__button').textContent = 'Сохранение...';

    ServerConnection.editProfile(profilePopupName.value, profilePopupDescription.value)
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res)
            }
        })
        .then((result) => {
            profileName.textContent = result.name;
            profileDescription.textContent = result.about;
            closeModal(profilePopup);
        })    
        .catch((err) => {
            console.log(err);
            alert('что-то пошло не так:(')
        })
        .finally(() => submitEditButton.querySelector('.popup__button').textContent = 'Сохранить')
});


const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
    cardPopupName.value = null;
    cardPopupURL.value = null;
    openModal(cardPopup);
});

const submitAddButton = cardPopup.querySelector('.popup__form');
submitAddButton.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitAddButton.querySelector('.popup__button').textContent = 'Создание...'

    ServerConnection.addCard(cardPopupName.value, cardPopupURL.value)
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res)
            }
        })
        .then((result) => {
            cardList.prepend(createCard(result));
            closeModal(cardPopup);
        })
        .catch((err) => {
            console.log(err);
            alert('что-то пошло не так:(')
        })
        .finally(() => submitAddButton.querySelector('.popup__button').textContent = 'Создать')


});

const editAvatarButton = document.querySelector('.profile__edit-avatar');
editAvatarButton.addEventListener('click', () => {
    avatarPopupURL.value = null;

    openModal(avatarPopup);
});

const submitEditAvatarButton = avatarPopup.querySelector('.popup__form');
submitEditAvatarButton.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitEditAvatarButton.querySelector('.popup__button').textContent = 'Сохранение...';

    ServerConnection.editAvatar(avatarPopupURL.value)
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res)
            }
        })
        .then((result) => {
            profileAvatar.style.backgroundImage = `url('${result.avatar}')`;
            closeModal(avatarPopup);
        })
        .catch((err) => {
            console.log(err);
            alert('что-то пошло не так:(')
        })
        .finally(() => submitEditAvatarButton.querySelector('.popup__button').textContent = 'Сохранить')

    
});

profilePopup.querySelector('.popup__close').addEventListener('click', () => closeModal(profilePopup));
cardPopup.querySelector('.popup__close').addEventListener('click', () => closeModal(cardPopup));
imagePopup.querySelector('.popup__close').addEventListener('click', () => closeModal(imagePopup));
avatarPopup.querySelector('.popup__close').addEventListener('click', () => closeModal(avatarPopup));



function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
}

profilePopup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closeModal(profilePopup)
    }
})

cardPopup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
        closeModal(cardPopup)
    }
})

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    }
}

import {enableValidation} from './validate.js';
enableValidation();