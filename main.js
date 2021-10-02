
source =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let data;
var order = new Map();
let orderTotal = 0;

fetch(source)
  .then((res) => res.json())
  .then((res) => {
    data = res;
    showDishes(0);
    let cancelOrder = document.getElementById("cancelOrder");
    cancelOrder.onclick = function () {
      order = new Map();
      orderTotal = 0;
      let items = document.getElementById("itemsInCart");
      items.innerText = "0 items";
      showOrder();
    };
  });

// Function for the questions 1&2

function showDishes(index) {
  const div = document.getElementById("dishes");
  div.innerHTML = "";

  const div2 = document.getElementById("order");
  div2.innerHTML = "";

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
      let numberOfItems = document.getElementById("itemsInCart");
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



function showOrder() {

  const div = document.getElementById("order");
  div.innerHTML = "";
  const div2 = document.getElementById("dishes");
  div2.innerHTML = "";

  let pageTitle = document.createElement("div");
  pageTitle.className = "text-center";
  let name = document.createElement("h1");
  name.innerText = "Order detail";
  pageTitle.appendChild(name);
  div.appendChild(pageTitle);

  let separator = document.createElement("hr");
  div.appendChild(separator);

  let allOrders = document.createElement("table");
  allOrders.className = "table table-striped";

  let tableHead = document.createElement("thead");
  let tableHeadRow = document.createElement("tr");
  let headers = [
    "No Item",
    "Quantity",
    "Description",
    "Unit Price",
    "Amount",
    "Modify",
  ];

  for (header of headers) {
    let tableHeader = document.createElement("th");
    tableHeader.scope = "col";
    tableHeader.innerText = header;
    tableHeadRow.appendChild(tableHeader);
  }
  tableHead.appendChild(tableHeadRow);
  allOrders.appendChild(tableHead);
  
  let tableBody = document.createElement("tbody");
  
  allOrders.appendChild(tableBody);
  div.appendChild(allOrders);
  
  let checkoutSection = document.createElement("div");
  checkoutSection.className = "row";
  
  let confirmChecking = document.createElement("span");
  confirmChecking.className = "float-right";

  let buttons = document.createElement("div");
  buttons.className = "d-grid gap-2";

  let cancelButton = document.createElement("button");
  cancelButton.className = "btn btn-danger";
  cancelButton.id = "cancelBtn";
  cancelButton.style = "margin: 2px";
  cancelButton.type = "button";
  cancelButton.dataset.toggle = "modal";
  cancelButton.dataset.target = "#cancelModal";
  cancelButton.innerText = "Cancel";

  let confirmButton = document.createElement("button");
  confirmButton.className = "btn btn-success";
  confirmButton.id = "SICAPITANESTAMOSLISTOS";
  confirmButton.style = "margin: 2px";
  confirmButton.type = "button";
  confirmButton.innerText = "Confirm order";

  buttons.appendChild(cancelButton);
  buttons.appendChild(confirmButton);
  confirmChecking.appendChild(buttons);
  
  checkoutSection.appendChild(confirmChecking);
  div.appendChild(checkoutSection);
}

const cart = document.getElementById("itemsInCart");
cart.addEventListener("click", function (event) {
  event.preventDefault();
  showOrder();
});
