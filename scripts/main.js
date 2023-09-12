const apiPosts = "https://dummyjson.com/posts";
const cards = document.querySelector(".posts-form");
const errorPost = document.querySelector(".error-post");
const searchButton = document.querySelector(".icon-post-search");
searchButton.addEventListener("click", getPosts);
const deleteButton = document.querySelector(".icon-post-del");
deleteButton.addEventListener("click", deletePosts);
const input = document.querySelector(".input");

// функция для удаления всех постов
function deletePosts() {
  cards.innerHTML = "";
  input.value = "";
  errorPost.innerHTML = "";
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
  
  const tag = input.value.toLowerCase().trim();

  fetch(apiPosts)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);

      // Фильтруем посты по введенному тегу
      const filteredPosts = data.posts.filter((post) =>
        post.tags.includes(tag));

        console.log(filteredPosts);

      // Проверяем, есть ли элементы
      if (filteredPosts.length > 0) {
        filteredPosts.forEach(function (post) {
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
        const errorMessage = createNode("h3");
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