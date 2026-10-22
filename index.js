/* Modal Function */
const modal = document.getElementById("main__modal");
const openModalButton = document.getElementById("open__modal");
const closeModalButton = document.querySelector(".close-button");

function closeModal(event) {
  modal.classList.remove("show");
}

openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
});

closeModalButton.addEventListener("click", () => {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 500);
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalButton.click();
  }
});

/* Sorting Function */
const animeElementsEl = document.querySelector(".anime-elements");
let animeData = [];

async function fetchAnime(filter) {
  if (filter === "LOW_TO_HIGH") {
    animeData.sort(
      (a, b) => a.attributes.episodeCount - b.attributes.episodeCount,
    );
  } else if (filter === "HIGH_TO_LOW") {
    animeData.sort(
      (a, b) => b.attributes.episodeCount - a.attributes.episodeCount,
    );
  }

  if (filter === "A_TO_Z") {
    animeData.sort((a, b) =>
      a.attributes.canonicalTitle.localeCompare(b.attributes.canonicalTitle),
    );
  } else if (filter === "Z_TO_A") {
    animeData.sort((a, b) =>
      b.attributes.canonicalTitle.localeCompare(a.attributes.canonicalTitle),
    );
  }

  displayAnimesHTML(animeData);
}

function displayAnimesHTML(data) {
  return (animeElementsEl.innerHTML = data
    .map(
      (anime) =>
        `<div class="display__card">
           <img
             src="${anime.attributes.posterImage.small}"
             class="anime__cover"
             alt=""
           />
           <div class="show__details">
             <p class="show__detail"><b>Title:</b> ${
               anime.attributes.canonicalTitle
             }</p>
             <p class="show__detail"><b>Age Rating:</b> ${anime.attributes.ageRatingGuide}</p>
             <p class="show__detail"><b>Episodes:</b> ${anime.attributes.episodeCount}</p>
             <button class="watch__btn"> Watch Now! <i class="fa-regular fa-circle-play"></i></button>
           </div>
         </div>
         <p class="show__detail show__synopsis"><b>Synopsis:</b> ${anime.attributes.synopsis}</p>`,
    )
    .join(""));
}

function filteranimeData(event) {
  const filter = event.target.value;
  fetchAnime(filter);
}

async function searchAPI(event) {
  event.preventDefault();
  const searchTerm = document.getElementById("search-area").value.trim();

  const response = await fetch(
    `https://kitsu.io/api/edge/anime?filter[text]=${searchTerm}`,
  );
  const data = await response.json();
  animeData = data.data;

  displayAnimesHTML(animeData);
}

fetchAnime();

setTimeout(() => {
  fetchAnime();
}, 1000);

function getanimeData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetchAnime());
    }, 1000);
  });
}
