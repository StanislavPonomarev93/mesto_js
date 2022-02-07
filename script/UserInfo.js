class UserInfo {
  constructor(userInfoName, userInfoJob, userInfoPhoto, nameProfile, aboutMe) {
    this.userInfoName = userInfoName;
    this.userInfoJob = userInfoJob;
    this.userInfoPhoto = userInfoPhoto;
    this.nameProfile = nameProfile;
    this.aboutMe = aboutMe;
  };
  setUserInfo(mestoApi) {
    mestoApi.getUserInfo()
      .then(data => {
        this.userInfoName.textContent = data.name;
        this.userInfoJob.textContent = data.about;
        this.nameProfile.value = data.name;
        this.aboutMe.value = data.about;
        this.userInfoPhoto.style.backgroundImage = `url('${data.avatar}')`;
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  };
  updateUserInfo = (name, about) => {
    this.userInfoName.textContent = name;
    this.userInfoJob.textContent = about;
  };
  updateUserAvatar = (avatar) => {
    this.userInfoPhoto.style.backgroundImage = `url('${avatar}')`;
  }
}