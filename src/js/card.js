function addCard() {
    var card = document.createElement("div");
    card.classList.add("card"); 

    card.innerHTML = `
        <h5 class="card-title">Заголовок карточки</h5>
        <p class="card-text">Текст карточки</p>;
`;

    var container = document.getElementById("cardContainer");

    container.appendChild(card);
}