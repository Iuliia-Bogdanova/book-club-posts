const apiPosts = "https://dummyjson.com/post";

const cards = document.querySelector(".success-post");

// получаем данные с API в консоль и в карточку undefined
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

















// const cards = document.querySelector(".posts-form");
// const errorPost = document.querySelector(".error-post");
// let newCard = "";

// function getPosts() {
//     fetch(apiPosts)
//         .then((res) => res.json())
//         .then((posts) => {
//         if (Array.isArray(posts)) {
//             newCard = posts
//             const body = posts.body
//             .map((post) => {
//                 return (newCard += `
//                 <div class="posts-form">
//                         <div class="success-post">
//                             <p class="title-post">${post.body}</p>
//                         </div>
//                     </div>
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
