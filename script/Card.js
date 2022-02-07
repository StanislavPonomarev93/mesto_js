class Card {
  constructor(mestoApi, popup, popupImage) {
    this.mestoApi = mestoApi;
    this.ownerId = 'ef6801977d9dcea3e6f43335';
    this.popup = popup;
    this.popupImage = popupImage;
    this.popupImagBig = popupImage.querySelector('.popup__image-big');
  };
  
  create = (cardData) => {
    const placeCard = document.createElement('div');
    const placeCardImage = document.createElement('div');
    const placeCardDeleteIcon = document.createElement('button');
    const placeCardDescription = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const placeCardLikeContainer = document.createElement('div');
    const placeCardLikeIcon = document.createElement('button');
    const placeCardLikeNumber = document.createElement('p');

    placeCard.classList.add('place-card');
    placeCardImage.classList.add('place-card__image');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');
    placeCardDescription.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');
    placeCardLikeContainer.classList.add('place-card__like-container');
    placeCardLikeIcon.classList.add('place-card__like-icon');
    placeCardLikeNumber.classList.add('place-card__like-number');

    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeContainer);
    placeCardLikeContainer.appendChild(placeCardLikeIcon);
    placeCardLikeContainer.appendChild(placeCardLikeNumber);
    placeCardLikeNumber.textContent = `${cardData.likes.length}`;
    placeCardName.textContent = cardData.name;
    placeCardImage.style.backgroundImage = `url(${cardData.link})`;

    if (cardData.owner._id === this.ownerId) {
      this.placeCardDeleteIcon = placeCardDeleteIcon;
      placeCardImage.appendChild(placeCardDeleteIcon);
      placeCardDeleteIcon.addEventListener('click', this.remove.bind(this));
    }

    cardData.likes.forEach(like => {
      if (like._id === this.ownerId) placeCardLikeIcon.classList.add('place-card__like-icon_liked')
    })

    this.placeCard = placeCard;
    this.cardData = cardData;
    this.placeCardLikeIcon = placeCardLikeIcon;
    this.placeCardLikeNumber = placeCardLikeNumber;
    this.placeCardImage = placeCardImage;
    this.addlisteners();

    return placeCard;
  };
  addlisteners() {
    this.placeCardLikeIcon.addEventListener('click', this.like);
    this.placeCardImage.addEventListener('click', this.popupImageCard);
  };
  like = (event) => {
    if (event.target.classList.value === 'place-card__like-icon') {
      this.mestoApi.setLike(this.cardData._id)
        .then(data => {
          this.placeCardLikeNumber.textContent = data.likes.length;
          this.placeCardLikeIcon.classList.toggle('place-card__like-icon_liked');
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    } else {
      this.mestoApi.deleteLike(this.cardData._id)
        .then(data => {
          this.placeCardLikeNumber.textContent = data.likes.length;
          this.placeCardLikeIcon.classList.toggle('place-card__like-icon_liked');
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }
  };
  remove = (event) => {
    event.stopPropagation();
    this.mestoApi.deleteCard(this.cardData._id)
      .then(() => {
        this.placeCardLikeIcon.removeEventListener('click', this.like);
        this.placeCardDeleteIcon.removeEventListener('click', this.remove);
        this.placeCardImage.removeEventListener('click', this.popupImageCard);
        this.placeCard.remove();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  popupImageCard = () => {
    this.popupImagBig.src = this.placeCardImage.style.backgroundImage.slice(5, -2);
    this.popup.openClosePopup(this.popupImage);
  };
}
