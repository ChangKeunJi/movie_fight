// http://www.omdbapi.com/?apikey=bb572d08&

//! Fetch API

const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    //   axios makes a new url in a proper way
    params: {
      apikey: "bb572d08",
      s: searchTerm,
    },
  });

  // In case coulnd't find search results, return empty array
  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

createAutoComplete({
  // Where to render input & autocomplete results
  root: document.querySelector(".autocomplete"),
  // Custom HTML for Dropdown items
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src="${imgSrc}" />
    ${movie.Title} (${movie.Year})
  `;
  },
  onOptionSelect(movie) {
    onMovieSelect(movie);
  },
  inputValue(movie) {
    return movie.Title;
  },
});

const onMovieSelect = async (movie) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "bb572d08",
      i: movie.imdbID,
    },
  });

  document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
  console.log(movieDetail);
  return `

    <article class="media">
      <figure>
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>

      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
  
    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <label class="subtitle" >Awards</label>
    </article>

    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
     <label class="subtitle" >Box Office</label>
    </article>

    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <label class="subtitle" >Metascore</label>
    </article>
 
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <label class="subtitle" >imdb Rating</label>
    </article>

    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <label class="subtitle" >imdb Vodes</label>
    </article>

  `;
};
