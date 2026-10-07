async function fetchAnime(filter) {
  const anime = await fetch("https://kitsu.io/api/edge/anime");
  const animeData = await anime.json();
  const animeElementsEl = document.querySelector(".anime-elements");
  console.log(animeData);

  if (filter === "LOW_TO_HIGH") {
    console.log(filter);
    const sortedAnimeData = animeData.data.sort((a, b) => a.attributes.episodeCount - b.attributes.episodeCount);
    console.log(sortedAnimeData);
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

fetchAnime();

function filterAnime(event) {
  if (event.target.value === "LOW_TO_HIGH") {
    console.log("low to high");}
}