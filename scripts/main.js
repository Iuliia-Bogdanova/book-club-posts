const apiPosts = "https://dummyjson.com/posts";
const cards = document.querySelector(".posts-form");
const errorPost = document.querySelector(".error-post");

const deleteButton = document.querySelector(".icon-post-del");
deleteButton.addEventListener("click", deletePosts);

// функция для удаления всех постов
function deletePosts() {
  cards.innerHTML = "";
}

// функции для создания элементов разметки
function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

// получаем и отрисовываем элементы
function getPosts() {
  fetch(apiPosts)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);

      // Проверяем, есть ли элементы
      if (data.posts && data.posts.length > 0) {
        data.posts.forEach(function (post) {
          // Создаем контейнер для карточки
          const card = createNode("div");
          card.classList.add("card");

          // Создаем заголовок карточки
          const title = createNode("h3");
          title.innerHTML = post.title;
          append(card, title);

          // Создаем список тегов
          const tags = createNode("h4");
          tags.innerHTML = post.tags;
          append(card, tags);

          // Создаем содержимое карточки
          const content = createNode("p");
          content.innerHTML = post.body;
          append(card, content);

          append(cards, card);
        });
      } else {
        // Если элементы не найдены, отображаем сообщение об ошибке
        const errorMessage = createNode("p");
        errorMessage.classList.add("error-message");
        errorMessage.innerHTML = "No posts found";
        append(errorPost, errorMessage);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

getPosts();