export default class Card {
  constructor(element) {
    if (typeof element === "string") {
      element = document.querySelector(element)
    }
    this.element = element;
    this.actualElement;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.element.addEventListener('mousedown', this.onMouseDown);
  }

  onMouseOver(e) {
    if (!(e.target.classList.contains('colomn-card'))) return;
    this.actualElement.style.top = `${e.clientY}px`;
    this.actualElement.style.left = `${e.clientX}px`;
  }

  onMouseUp(e) {
    const mouseUpItem = e.target;
    let array = [];
    if (mouseUpItem.classList.contains('colomn-card__text')) {
      mouseUpItem.parentElement.insertAdjacentElement('beforebegin', this.actualElement);
      const key = this.actualElement.parentElement.parentElement.id;
      const text = this.actualElement.children[0].textContent;
      const parent = this.actualElement.parentElement;
      const values = JSON.parse(localStorage.getItem(key));
      array = values;
      const index = Array.from(parent.children).indexOf(this.actualElement);
      array.splice(index, 0, text);
      localStorage.setItem(key, JSON.stringify(array));
    }
    if (mouseUpItem.classList.contains('column') && mouseUpItem.children[1].childNodes.length === 0) {
      mouseUpItem.children[1].insertAdjacentElement('afterbegin', this.actualElement);
      const key = this.actualElement.parentElement.parentElement.id;
      const text = this.actualElement.children[0].textContent;
      array.push(text);
      localStorage.setItem(key, JSON.stringify(array));
    }
    this.actualElement.classList.remove('dragged');
    this.actualElement = undefined;
    this.element.removeEventListener('mouseup', this.onMouseUp);
    this.element.removeEventListener('mouseover', this.onMouseOver);
  }

  onMouseDown(e) {
    e.preventDefault();
    let array = [];
    if (!(e.target.classList.contains('colomn-card__text'))) return;
    this.actualElement = e.target.parentElement;
    const key = this.actualElement.parentElement.parentElement.id;
    const parent = this.actualElement.parentElement;
    const values = JSON.parse(localStorage.getItem(key));
    array = values;
    const index = Array.from(parent.children).indexOf(this.actualElement);
    array.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(array));
    this.actualElement.classList.add('dragged');
    this.element.addEventListener('mouseup', this.onMouseUp);
    this.element.addEventListener('mouseover', this.onMouseOver);
  }
}