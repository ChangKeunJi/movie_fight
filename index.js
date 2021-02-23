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

//! DOM HTML

const root = document.querySelector(".autocomplete");
root.innerHTML = `

    <label><b>Search for a movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>

`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
// For hiding dropdown contents by is-active
const resultsWrapper = document.querySelector(".results");
// Parent div to append a list

//! Autocomplete function

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);
  console.log(movies);

  // Clear previous dropdown items
  resultsWrapper.innerHTML = "";

  // Render dropdown
  dropdown.classList.add("is-active");

  for (let movie of movies) {
    const option = document.createElement("a");
    option.classList.add("dropdown-item");

    // In case Image is not included in data
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    option.innerHTML = `
        <img src="${imgSrc}" />
        ${movie.Title}
      `;

    resultsWrapper.appendChild(option);
  }
};

//! Event Listener
input.addEventListener("input", debounce(onInput, 1000));

document.addEventListener("click", (e) => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});
