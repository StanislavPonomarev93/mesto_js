class CardList {
  constructor(placesList, createCardFunction) {
    this.placesList = placesList;
    this.createCardFunction = createCardFunction;
  };

  addCard = (objData) => this.placesList.appendChild(this.createCardFunction().create(objData));

  render(mestoApi) {
    mestoApi.getInitialCards()
      .then(cards => cards.forEach(item => this.addCard(item)))
      .catch(err => console.log(`Ошибка: ${err}`))
  };
}