const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "96191cad6emsh052d12666af54c3p1d2720jsn8ae6dd9c656f",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

const menuList = document.getElementById("menuListMovies");
const search = document.getElementById("search");
const getTitles = async () => {
  const url = "https://moviesdatabase.p.rapidapi.com/titles";
  // fetch 1 method trong js:
  // 1: url
  // 2: options
  //  => promise: response
  // status: 200, 300, 400, 500
  try {
    const response = await fetch(url, options); //việc A: fetch url: thực hienej bất đồng bộ: trả về response
    const { results } = await response.json(); //việc B: chuyển response thành json: thực hiện bất đồng bộ: trả về data
    results.forEach((element) => {
      const menuItem = document.createElement("li");
      const titleMovie = document.createElement("h1");
      const clickMovie = document.createElement("button");
      clickMovie.innerText = "Click";
      clickMovie.addEventListener("click", async () => {
        const data = await getRatings(element.id);

        console.log("rating", data);
      });
      titleMovie.innerText = element.titleText.text;

      const imageMovie = document.createElement("img");
      imageMovie.src = element.primaryImage.url;

      menuItem.appendChild(clickMovie);
      menuItem.appendChild(titleMovie);
      menuItem.appendChild(imageMovie);
      menuList.appendChild(menuItem);
    });
  } catch (error) {
    console.error(error);
  }
};

const getRatings = async (id) => {
  const url = `https://moviesdatabase.p.rapidapi.com/titles/${id}/ratings`;
  try {
    const response = await fetch(url, options);
    const { results } = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};

// getTitles();

search.addEventListener("change", async (event) => {
  const API_KEY = "4269652c5e1b6a66a34f9d3d16ecc098";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${API_KEY}&units=metric&lang=vi`
  );
  const data = await response.json();
  console.log(data);
});
