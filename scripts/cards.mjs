const cards = document.querySelector(".posts-form");
const errorPost = document.querySelector(".error-post");
const input = document.querySelector(".input");
let observer;

// удаляю карточки
function deletePosts() {
    cards.innerHTML = "";
    input.value = "";
    errorPost.innerHTML = "";
    if (observer) {
        observer.disconnect(); // отключаю Intersection Observer
    }
}

// создаю элементы разметки
function createNode(element) {
return document.createElement(element);
}

function append(parent, el) {
return parent.appendChild(el);
}

// отрисовка карточек
function renderPosts(posts) {
    posts.forEach(function (post) {
        // контейнер для карточки
        const card = createNode("div");
        card.classList.add("card");

        // заголовок карточки
        const title = createNode("h3");
        title.innerHTML = post.title;
        append(card, title);

        // список тегов
        const tags = createNode("h4");
        tags.innerHTML = post.tags;
        append(card, tags);

        // содержимое карточки
        const content = createNode("p");
        content.innerHTML = post.body;
        append(card, content);

        append(cards, card);
    });
}

export { deletePosts, createNode, append, renderPosts, cards, errorPost, input };
