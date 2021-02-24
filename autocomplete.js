// config contains all the informations to do autocomplete

const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //   const root = document.querySelector(".autocomplete");
  root.innerHTML = `
    
        <label><b>Search</b></label>
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
    const items = await fetchData(event.target.value);

    // Clear previous dropdown items
    resultsWrapper.innerHTML = "";

    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    // Render dropdown
    dropdown.classList.add("is-active");

    // Create dropdown items and attach to DOM
    for (let item of items) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");

      option.innerHTML = renderOption(item);

      resultsWrapper.appendChild(option);

      // Click and Render that item
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
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
