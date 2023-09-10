const apiPosts = "https://dummyjson.com/posts";

const cards = document.querySelector(".success-post");
const errorPost = document.querySelector(".error-post");
let newCard = "";

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

// const apiPosts = "https://dummyjson.com/posts";

// const cards = document.querySelector(".success-post");
// const errorPost = document.querySelector(".error-post");
// let newCard = "";

// // функции для создания элементов разметки
// function createNode(element) {
//     return document.createElement(element);
//     }

//     function append(parent, el) {
//     return parent.appendChild(el);
// }

// // получаем и отрисовываем элементы
// function getPosts() {
//     fetch(apiPosts)
//     .then((resp) => resp.json())
//     .then(function(data) {
//         console.log(data);
//         let posts = data.posts || [];
//         return posts.forEach(function(post) {
//             let p = createNode("p");
//             p.innerHTML = `${post.id}`;
//             append(cards, p);
//         })
        
//     })
//     .catch(function(error) {
//         console.log(error);
//     })
// }

// getPosts();

// 1. функция работает при "https://dummyjson.com/posts/1" - выводится в 1 карточке 1 пост. при "https://dummyjson.com/posts" - в карточке отрисовывается undefined. вся разметка в HTML

// function getPosts() {
//     fetch(apiPosts)
//         .then((res) => res.json())
//         .then((posts) => {
//         console.log(posts);
//         newCard = posts;
//         const body = posts.body;
//         cards.innerHTML = body;
//         })
//         .catch((error) => {
//         console.error(error);
//     });
// }

// getPosts();

// 2. то же самое, только разметка в JS - если убираю из HTML - пост не отрисовывается. при "https://dummyjson.com/posts" - в карточке пусто
// (методы DOM для создания и добавления элементов в HTML-структуру, а также методы для установки классов и текстового содержимого элементов)

// function getPosts() {
//     fetch(apiPosts)
//         .then((res) => res.json())
//         .then((posts) => {
//         console.log(posts);
//         newCard = posts;
//         const body = posts.body;
//         const newCardElement = document.createElement("p");
//         newCardElement.classList.add("body-post");
//         newCardElement.textContent = body;
//         cards.appendChild(newCardElement);
//         })
//         .catch((error) => {
//         console.error(error);
//     });
// }

// getPosts();

// 3. forEach, динамическая разметка DOM. карточки не отрисовываются

// function getPosts() {
//     fetch(apiPosts)
//         .then((res) => res.json())
//         .then((posts) => {
//         console.log(posts);
//         if (Array.isArray(posts)) {
//             posts.forEach((post) => {
//             const successPost = document.createElement("div");
//             successPost.classList.add("success-post");

//             const titlePost = document.createElement("p");
//             titlePost.classList.add("title-post");
//             titlePost.textContent = post.body;

//             successPost.appendChild(titlePost);
//             cards.appendChild(successPost);
//             });
//         } else {
//             errorPost.style.display = "block";
//         }
//         })
//         .catch((error) => {
//         console.error(error);
//     });
// }

// getPosts();

// 4. используем forEach, переносим разметку шаблонными строками, карточки не отрисовываются

// function getPosts() {
//     fetch(apiPosts)
//         .then((res) => res.json())
//         .then((posts) => {
//         if (Array.isArray(posts)) {
//             posts.forEach((post) => {
//             newCard += `
//                 <div class="success-post">
//                 <p class="title-post">${post.body}</p>
//                 </div>
//             `;
//             });
//             cards.innerHTML = newCard;
//         } else {
//             errorPost.style.display = "block";
//         }
//         console.log(posts);
//         })
//         .catch((error) => {
//         console.log(error);
//         errorPost.style.display = "block";
//     });
// }

// getPosts();



// 5. использую map, шаблонные строки, карточки не отрисовываются

// function getPosts() {
//     fetch(apiPosts)
//         .then((res) => res.json())
//         .then((posts) => {
//         if (Array.isArray(posts)) {
//             newCard = posts
//             const body = posts.body
//             .map((post) => {
//                 return (newCard += `
//                     <div class="success-post">
//                         <p class="title-post">${posts.body}</p>
//                         </div>
//                     `);
//             })
//             .join("");
//             cards.innerHTML = newCard;
//         } else {
//             errorPost.style.display = "block";
//         }
//         console.log(posts);
//         })
//         .catch((error) => {
//         console.log(error);
//         errorPost.style.display = "block";
//     });
// }

// getPosts();




