async function fetchAnime(filter) {
  const anime = await fetch("https://kitsu.io/api/edge/anime");
  const animeData = await anime.json();
  const animeElementsEl = document.querySelector(".anime-elements");

  if (filter === "LOW_TO_HIGH") {
    animeData.data.sort(
      (a, b) => a.attributes.episodeCount - b.attributes.episodeCount,
    );
  } else if (filter === "HIGH_TO_LOW") {
    animeData.data.sort(
      (a, b) => b.attributes.episodeCount - a.attributes.episodeCount,
    );
  }

  if (filter === "A_TO_Z") {
    animeData.data.sort((a, b) =>
      a.attributes.canonicalTitle.localeCompare(b.attributes.canonicalTitle),
    );
  } else if (filter === "Z_TO_A") {
    animeData.data.sort((a, b) =>
      b.attributes.canonicalTitle.localeCompare(a.attributes.canonicalTitle),
    );
  }

  animeElementsEl.innerHTML = animeData.data
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
    .join("");
}

function filteranimeData(event) {
  const filter = event.target.value;
  fetchAnime(filter);
}

function searchAPI(event) {
  event.preventDefault();
  const searchTerm = document.getElementById("search-area").value.trim();
  const data = [
    "Cowboy Bebop",
    "Cowboy Bebop: Knockin' on Heaven's Door",
    "Trigun",
    "Witch Hunter Robin",
    "Beet the Vandel Buster",
    "Eyeshield 21",
    "Honey and Clover",
    "Hungry Heart: Wild Striker",
    "Initial D Fourth Stage",
    "Monster",
  ];

  if (data.includes(searchTerm)) {
    console.log(`Found: ${searchTerm} is in the list!`);
    document.getElementById("no__results").style.display = "none";
  } else {
    console.log(`Error: ${searchTerm} not found.`);
    document.getElementById("no__results").style.display = "block"
    document.getElementById("anime__selection").style.display = "none"; // Show no results section
  }
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
