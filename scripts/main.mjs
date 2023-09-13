import { deletePosts } from "./cards.mjs";
import { createNode } from "./cards.mjs";
import { append } from "./cards.mjs";
import { renderPosts } from "./cards.mjs";
import { cards } from "./cards.mjs";
import { errorPost } from "./cards.mjs";
import { input } from "./cards.mjs";

const apiPosts =
  "https://dummyjson.com/posts?limit=60&skip=0&select=title,tags,body,id";
const searchButton = document.querySelector(".icon-post-search");
searchButton.addEventListener("click", getPosts);
const deleteButton = document.querySelector(".icon-post-del");
deleteButton.addEventListener("click", deletePosts);
let observer;
let filteredPosts;

// получаю посты по keyword
function getPosts() {
  const tag = input.value.toLowerCase().trim();

  // проверяю, есть ли значение в input
  if (tag) {
    fetch(apiPosts)
      .then((resp) => resp.json())
      .then(function (data) {
        console.log(data);

        // фильтрую посты по keyword
        filteredPosts = data.posts.filter((post) => post.tags.includes(tag));

        console.log(filteredPosts);

        // удаляю предыдущие сообщения об ошибке
        errorPost.innerHTML = "";

        // проверяю, есть ли посты по тегу
        if (filteredPosts.length > 0) {
          renderPosts(filteredPosts);
          
          // создаю Intersection Observer
          observer = new IntersectionObserver(
            function (entries) {
              // подгружаю следующие посты, которые проходят порог видимости
              entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                  console.log("Intersection observed");
                  loadMorePosts();
                }
              });
            },
            { threshold: 0.5 } // порог видимости
          );

          // наблюдаю за последней карточкой
          const lastCard = document.querySelector(".card:last-child");
          if (lastCard) {
            observer.observe(lastCard);
            console.log(lastCard);
          }
        } else {
          // если посты не найдены, вывожу сообщение об ошибке
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

function loadMorePosts() {
  // увеличиваю лимит загрузки постов
  const newLimit = cards.children.length + 6;

  // загружаю следующие посты из API
  fetch(`${apiPosts}&limit=${newLimit}&skip=${filteredPosts.length}`)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);

      // объединяю посты
      filteredPosts = filteredPosts.concat(newPosts);

      renderPosts(filteredPosts);

      // проверяю, все ли посты загружены
      if (cards.children.length >= filteredPosts.length) {
        // отключаю Intersection Observer
        observer.disconnect();
      } else {
        // обновляю observer
        observer.unobserve(cards.querySelector(".card:last-child"));
        observer.observe(cards.querySelector(".card:last-child"));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

getPosts();