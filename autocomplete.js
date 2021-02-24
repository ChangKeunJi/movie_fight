// config contains all the informations to do autocomplete

const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
}) => {
  //   const root = document.querySelector(".autocomplete");
  root.innerHTML = `
    
        <label><b>Search for a movie</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    
    `;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  //! Autocomplete function

  const onInput = async (event) => {
    const movies = await fetchData(event.target.value);
    console.log(movies);

    // Clear previous dropdown items
    resultsWrapper.innerHTML = "";

    if (!movies.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    // Render dropdown
    dropdown.classList.add("is-active");

    // Create dropdown items and attach to DOM
    for (let movie of movies) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");

      option.innerHTML = renderOption(movie);

      resultsWrapper.appendChild(option);

      // Click and Render that movie
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(movie);
        onOptionSelect(movie);
      });
    }
  };

  input.addEventListener("input", debounce(onInput, 1000));

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
