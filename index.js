async function fetchAnime() {
  const anime = await fetch("https://kitsu.io/api/edge/anime");
  const animeData = await anime.json();
  const animeElementsEl = document.querySelector(".anime-elements");
  console.log(animeData);

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
            <p class="show__detail"><b>Length:</b> ${anime.attributes.episodeCount} episodes</p>
            <p class="show__detail"><b>Synopsis:</b> ${anime.attributes.synopsis}</p>
          </div>
        </div>`,
    )
    .join("");
}

fetchAnime();
