export default function locStorage(element) {
  const columns = Array.from(document.querySelectorAll(element));
  columns.forEach((column) => {
    if (localStorage.getItem(column.id) !== null) {
      const values = JSON.parse(localStorage.getItem(column.id));
      values.forEach((value) => {
        column.children[1].insertAdjacentHTML(
          'beforeEnd',
          `<div class="colomn-card">
                        <div class="colomn-card__text">${value}</div>
                        <div class="colomn-card__close">&#10006</div>
                    </div>`,
        );
      });
    }
  });
}