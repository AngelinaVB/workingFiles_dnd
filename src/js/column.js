export default class Column {
  constructor(element) {
    if (typeof element === "string") {
      element = document.querySelector(element)
    }
    this.element = element;
    this.onNewCard= this.onNewCard.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
    this.deleteNewCard = this.deleteNewCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.element.addEventListener('click', this.onNewCard);
    this.element.addEventListener('click', this.addNewCard);
    this.element.addEventListener('click', this.deleteNewCard);
    this.element.addEventListener('click', this.deleteCard);
  }

 onNewCard(e) {
    e.preventDefault();
    if (!(e.target.classList.contains('column-add__card'))) return;
    e.target.parentElement.insertAdjacentHTML(
      'beforeEnd',
      ` <form class='card-new'>
            <textarea class='card-new__text' id="name" type='text' required placeholder='Enter a title for this card...'></textarea>
            <div class='card-new-container'>
                <button class='card-new-container__button'>Add Card</button>
                <div class="card-new-container__close">&#10006;</div>
            </div>
         </form>`,
    );
  }

  addNewCard(e) {
    e.preventDefault();
    let array = [];
    if (!(e.target.classList.contains('card-new-container__button'))) return;
    const textContent = e.target.parentElement.parentElement.children[0].value;
    const key = e.target.parentElement.parentElement.parentElement.id;
    const valueLocalStorage = localStorage.getItem(key);
    if (valueLocalStorage !== null) {
      const value = JSON.parse(localStorage.getItem(key));
      array = value;
      array.push(textContent);
      localStorage.setItem(key, JSON.stringify(array));
    } else {
      array.push(textContent);
      localStorage.setItem(key, JSON.stringify(array));
    }
    const form = this.element.querySelector('form');
    form.parentElement.children[1].insertAdjacentHTML(
      'beforeEnd',
      `<div class="colomn-card">
                <div class="colomn-card__text">${textContent}</div>
                <div class="colomn-card__close">&#10006</div>
            </div>`,
    );
    form.remove();
  }

  deleteNewCard(e) {
    e.preventDefault();
    if (!(e.target.classList.contains('card-new-container__close'))) return;
    const form = this.element.querySelector('form');
    form.remove();
  }

  deleteCard(e) {
    e.preventDefault();
    let array = [];
    if (!(e.target.classList.contains('colomn-card__close'))) return;
    const key = e.target.parentElement.parentElement.parentElement.id;
    const parent = e.target.parentElement.parentElement;
    const values = JSON.parse(localStorage.getItem(key));
    array = values;
    const index = Array.from(parent.children).indexOf(e.target.parentElement);
    array.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(array));
    e.target.parentElement.remove();
  }
}