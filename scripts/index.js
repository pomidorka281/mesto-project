// @todo: Темплейт карточки
const cardList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const profilePopupName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupDescription = profilePopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const cardPopup = document.querySelector('.popup_type_new-card');
const cardPopupName = cardPopup.querySelector('.popup__input_type_card-name');
const cardPopupURL = cardPopup.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupLink = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const cardTemplate = document.querySelector('#card-template').content;

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
    profilePopupName.value = profileName.textContent;
    profilePopupDescription.value = profileDescription.textContent;

    openModal(profilePopup);
});

const submitEditButton = profilePopup.querySelector('.popup__form');
submitEditButton.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = profilePopupName.value;
    profileDescription.textContent = profilePopupDescription.value;
    closeModal(profilePopup);
});

profilePopup.querySelector('.popup__close').addEventListener('click', () => closeModal(profilePopup));


const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
    cardPopupName.value = null;
    cardPopupURL.value = null;
    openModal(cardPopup);
});

const submitAddButton = cardPopup.querySelector('.popup__form');
submitAddButton.addEventListener('submit', (evt) => {
    evt.preventDefault();
    cardList.append(createCard({'name':cardPopupName.value, 'link':cardPopupURL.value}));
    closeModal(cardPopup);
});

cardPopup.querySelector('.popup__close').addEventListener('click', () => closeModal(cardPopup));
imagePopup.querySelector('.popup__close').addEventListener('click', () => closeModal(imagePopup));

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard (elem) {
    let newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
    let cardTitle = newCard.querySelector('.card__title');
    let cardImage = newCard.querySelector('.card__image');
    let cardLike = newCard.querySelector('.card__like-button');
    let cardDelete = newCard.querySelector('.card__delete-button');

    cardLike.addEventListener('click', () => cardLike.classList.toggle('card__like-button_is-active'));
    cardDelete.addEventListener('click', (evt) => evt.target.closest('.card').remove());


    cardImage.addEventListener('click', () => {
        imagePopupLink.src = elem['link'];
        imagePopupCaption.textContent = elem['name'];
        openModal(imagePopup);
    });

    cardTitle.textContent = elem['name'];
    cardImage.alt = elem['name'];
    cardImage.src = elem['link'];
    return newCard;
};

initialCards.forEach(elem => cardList.append(createCard(elem)));

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу




function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}