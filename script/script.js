 (function () {
   const root = document.querySelector('.root');
   const placesList = root.querySelector('.places-list');
   const popupCard = root.querySelector('.popup__card');
   const popupProfile = root.querySelector('.popup__profile');
   const userInfoName = root.querySelector('.user-info__name');
   const userInfoJob = root.querySelector('.user-info__job');
   const userInfoButton = root.querySelector('.user-info__button');
   const popupCloseCard = root.querySelector('.popup__close-card');
   const userInfoEdit = root.querySelector('.user-info__edit');
   const popupCloseProfile = root.querySelector('.popup__close-profile');
   const popupImage = root.querySelector('.popup__image');
   const popupCloseImage = root.querySelector('.popup__close-image');
   const userInfoAvatarIcon = root.querySelector('.user-info__avatar-icon');
   const popupAvatar = root.querySelector('.popup__avatar');
   const popupCloseAvatar = root.querySelector('.popup__close-avatar');
   const userInfoPhoto = root.querySelector('.user-info__photo');
   const formNew = document.forms.new;
   const formProfile = document.forms.profile;
   const formAvatar = document.forms.avatar;

   const errorMessages = {
     valueMissing: 'Это обязательное поле',
     tooShort: 'Должно быть от 2 до 30 символов',
     tooLong: 'Должно быть от 2 до 30 символов',
     typeMismatch: 'Здесь должна быть ссылка',
   };
   const options = {
     baseUrl: 'https://nomoreparties.co/cohort12',
     token: {
       headers: {
         authorization: 'd4572fc5-fe6c-4e19-8131-2e629bd6f3d0'
       }
     },
     headers: {
       authorization: 'd4572fc5-fe6c-4e19-8131-2e629bd6f3d0',
       'Content-Type': 'application/json'
     }
   };

   const mestoApi = new MestoApi(options);
   const createCardFunction = () => new Card(mestoApi, popup, popupImage);
   const cardList = new CardList(placesList, createCardFunction);
   const popup = new Popup();
   const userInfo = new UserInfo(userInfoName, userInfoJob, userInfoPhoto, nameProfile, aboutMe);
   const formValidatorCard = new FormValidator(formNew, errorMessages);
   const formValidatorProfile = new FormValidator(formProfile, errorMessages);
   const formValidatorAvatar = new FormValidator(formAvatar, errorMessages);

   cardList.render(mestoApi);
   userInfo.setUserInfo(mestoApi);
   formValidatorCard.setEventListeners();
   formValidatorProfile.setEventListeners();
   formValidatorAvatar.setEventListeners();




   formNew.addEventListener('submit', (event) => {
     event.preventDefault();
     event.submitter.textContent = 'Загрузка...';
     const objData = {
       name: formNew.name.value,
       link: formNew.link.value
     }
     mestoApi.addCard(objData)
       .then(res => {
         cardList.addCard(res);
         event.submitter.textContent = '+';
         popup.openClosePopup(popupCard);
         formNew.reset();
       })
       .catch(err => console.log(`Ошибка: ${err}`))
   });

   userInfoButton.addEventListener('click', () => {
     formValidatorCard.checkInputsForms();
     popup.openClosePopup(popupCard);
   });

   userInfoEdit.addEventListener('click', () => {
     userInfo.setUserInfo(mestoApi);
     formValidatorProfile.checkInputsForms();
     popup.openClosePopup(popupProfile);
   });

   userInfoAvatarIcon.addEventListener('click', () => {
     formValidatorAvatar.checkInputsForms();
     popup.openClosePopup(popupAvatar);
   });

   popupCloseAvatar.addEventListener('click', () => {
     formAvatar.reset();
     popup.openClosePopup(popupAvatar);
   });

   formAvatar.addEventListener('submit', (event) => {
     event.preventDefault();
     event.submitter.textContent = 'Загрузка...';
     mestoApi.changeAvatar(avatarLink.value)
       .then(res => {
         userInfo.updateUserAvatar(res.avatar);
         event.submitter.textContent = '+';
         popup.openClosePopup(popupAvatar);
         formAvatar.reset();
       })
       .catch(err => console.log(`Ошибка: ${err}`))
   });

   popupCloseCard.addEventListener('click', () => {
     formNew.reset();
     popup.openClosePopup(popupCard);
   });

   popupCloseProfile.addEventListener('click', () => {
     popup.openClosePopup(popupProfile);
   });

   popupCloseImage.addEventListener('click', () => {
     popup.openClosePopup(popupImage);
   });

   formProfile.addEventListener('submit', (event) => {
     event.preventDefault();
     event.submitter.textContent = 'Загрузка...';
     mestoApi.sendUserInfo(nameProfile.value, aboutMe.value)
       .then(res => {
         userInfo.updateUserInfo(res.name, res.about)
         event.submitter.textContent = '+';
         popup.openClosePopup(popupProfile);
         formProfile.reset();
       })
       .catch(err => console.log(`Ошибка: ${err}`))
   });
 }());