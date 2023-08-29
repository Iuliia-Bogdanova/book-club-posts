const apiPosts = "https://dummyjson.com/posts";

const cards = document.querySelector(".success-post");
const errorPost = document.querySelector(".error-post");
let newCard = "";

// 1. функция работает при "https://dummyjson.com/posts/1" - выводится в 1 карточке 1 пост. при "https://dummyjson.com/posts" - в карточке отрисовывается undefined. вся разметка в HTML

function getPosts() {
    fetch(apiPosts)
        .then((res) => res.json())
        .then((posts) => {
        console.log(posts);
        newCard = posts;
        const body = posts.body;
        cards.innerHTML = body;
        })
        .catch((error) => {
        console.error(error);
    });
}

getPosts();

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




