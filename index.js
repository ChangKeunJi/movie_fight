// http://www.omdbapi.com/?apikey=bb572d08&

const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    //   axios makes a new url in a proper way
    params: {
      apikey: "bb572d08",
      s: searchTerm,
    },
  });
  console.log(response.data);
};

const input = document.querySelector("input");

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

let timeoutId;

const onInput = (event) => {
  fetchData(event.target.value);
};

// Invoke a callback whenever input changed
input.addEventListener("input", debounce(onInput, 1200));
