const apiPosts = "https://dummyjson.com/posts?limit=150&skip=0&select=title,tags,body";
const cards = document.querySelector(".posts-form");
const errorPost = document.querySelector(".error-post");
const searchButton = document.querySelector(".icon-post-search");
searchButton.addEventListener("click", getPosts);
const deleteButton = document.querySelector(".icon-post-del");
deleteButton.addEventListener("click", deletePosts);
const input = document.querySelector(".input");

// удаляем все посты
function deletePosts() {
  cards.innerHTML = "";
  input.value = "";
  errorPost.innerHTML = "";
}

// создаем элементы разметки
function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

// получаем и отрисовываем элементы
function getPosts() {
  const tag = input.value.toLowerCase().trim();

  // проверяем, есть ли значение в input
  if (tag) {
    fetch(apiPosts)
      .then((resp) => resp.json())
      .then(function (data) {
        console.log(data);

        // фильтруем посты по keyword
        const filteredPosts = data.posts.filter((post) =>
          post.tags.includes(tag)
        );

        console.log(filteredPosts);

        // удаляем предыдущие сообщения об ошибке
        errorPost.innerHTML = "";

        // проверяем, есть ли посты по тегу
        if (filteredPosts.length > 0) {
          filteredPosts.forEach(function (post) {
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
        } else {
          // если посты не найдены, выводим сообщение об ошибке
          const errorMessage = createNode("h3");
          errorMessage.classList.add("error-message");
          errorMessage.innerHTML =
            "sorry, No posts found. <br /><br />Please try using keywords such as:<br /><br />'american' 'english' 'french'<br />'classic' 'history' 'fiction'<br />'mystery' 'magical'<br />'love', 'crime'";
          append(errorPost, errorMessage);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

getPosts();

// Создаем Intersection Observer
// const options = {
// 	root: null,
// 	rootMargin: ' 0px 0px 75px 0px',
// 	threshold: 0.5,
// };

// const cardObserver = new IntersectionObserver ((entries, observer) => {
//   console.log(entries);
// },
//   {}
// )

// document.querySelectorAll('.posts-form').forEach(card => cardObserver.observe(card));