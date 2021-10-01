
source =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let data;

fetch(source)
  .then((res) => res.json())
  .then((res) => {
    data = res;
    showDishes(0);
  });

// Function for the questions 1&2

function showDishes(index) {
  const div = document.getElementById("dishes");
  div.innerHTML = "";

  let pageTitle = document.createElement("div");
  pageTitle.className = "text-center";
  let name = document.createElement("h1");
  name.innerText = data[index]["name"];
  pageTitle.appendChild(name);
  div.appendChild(pageTitle);

  let separator = document.createElement("hr");
  div.appendChild(separator);

  let grid = document.createElement("div"); 
  grid.className = "card-group";
  let i = 0;

  while (i < data[index]["products"].length) {

    let container = document.createElement("div");
    container.className = "col-3";
    container.style = "padding: 6px;";
    
    let dish = document.createElement("div");
    dish.className = "dish";
    dish.style = "margin-bottom:20px;";

    let image = document.createElement("img");
    image.src = data[index]["products"][i]["image"];
    image.className = "card-img-top";
    image.style = "height: 12rem;";

    let dishBody = document.createElement("div");
    dishBody.className = "card-body";

    let button = document.createElement("p");
    button.innerText = "Add to cart";
    button.className = "btn btn-secondary addToCartButton";

    let dishName = document.createElement("h4");
    dishName.innerText = data[index]["products"][i]["name"];
    dishName.className = "card-title";

    let dishDescription = document.createElement("p");
    dishDescription.innerText = data[index]["products"][i]["description"];
    dishDescription.className = "card-text";

    let dishPrice = document.createElement("h5");
    dishPrice.innerText = "$" + data[index]["products"][i]["price"];
    dishPrice.className = "card-text font-weight-bold";

    grid.appendChild(container);
    container.appendChild(dish);
    dish.appendChild(image);
    dish.appendChild(dishBody);
    dish.appendChild(button);
    dishBody.appendChild(dishName);
    dishBody.appendChild(dishDescription);
    dishBody.appendChild(dishPrice);

    i++;
  }

  div.appendChild(grid);

  $(".addToCartButton").each(function () {
    var btn = this;
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      let numberOfItems = document.getElementById("items");
      let text = numberOfItems.innerText;
      let num = parseInt(text.split(" "[0]));
      num += 1;
      numberOfItems.innerText = num + " items";
    });
  });
}

// Clicking on the dish category in the navbar

const burgers = document.getElementById("0");
burgers.addEventListener("click", function (event) {
  event.preventDefault();
  showDishes(0);
});

const tacos = document.getElementById("1");
tacos.addEventListener("click", function (event) {
  event.preventDefault();
  showDishes(1);
});

const salads = document.getElementById("2");
salads.addEventListener("click", function (event) {
  event.preventDefault();
  showDishes(2);
});

const desserts = document.getElementById("3");
desserts.addEventListener("click", function (event) {
  event.preventDefault();
  showDishes(3);
});

const drinks = document.getElementById("4");
drinks.addEventListener("click", function (event) {
  event.preventDefault();
  showDishes(4);
});
