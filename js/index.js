// Loading
$(function () {
  document.querySelector("#loading").classList.add("d-none");
});

// ========================================================================
// ========================================================================
// ========================================================================

// ===========================================
// ============== Side Nav Menu ==============
// ===========================================
let mainTag = document.querySelector("#main");
let searchTag = document.querySelector("#search");
let categoriesTag = document.querySelector("#categories");
let areaTag = document.querySelector("#area");
let ingredientTag = document.querySelector("#ingredient");
let contactUsTag = document.querySelector("#contactUs");
let detailsTag = document.querySelector("#details");

$("#btn-open").on("click", closeSideNaveMenu);
function closeSideNaveMenu() {
  if ($("#btn-open").hasClass("fa-bars")) {
    $("#btn-open").addClass("fa-xmark");
    $("#btn-open").removeClass("fa-bars");
  } else {
    $("#btn-open").addClass("fa-bars");
    $("#btn-open").removeClass("fa-xmark");
  }

  if ($("nav").css("left") != "0px") {
    $("nav").css({ left: "0px" });
  } else {
    $("nav").css({ left: "-260px" });
  }

  if ($(".nav-links ul li").css("top") != "0px") {
    $(".nav-links ul li").css({ top: "0px" });
  } else {
    $(".nav-links ul li").css({ top: "200px" });
  }
}

let navUl = document.querySelector("nav ul");
// ============== Search Link ==============
navUl.firstElementChild.addEventListener("click", function () {
  mainTag.classList.add("d-none");
  searchTag.classList.remove("d-none");
  categoriesTag.classList.add("d-none");
  areaTag.classList.add("d-none");
  ingredientTag.classList.add("d-none");
  contactUsTag.classList.replace("d-flex", "d-none");
  detailsTag.classList.add("d-none");
  clearInputs();
  closeSideNaveMenu();
});

// ============== Categories Link ==============
navUl.children[1].addEventListener("click", function () {
  mainTag.classList.add("d-none");
  searchTag.classList.add("d-none");
  categoriesTag.classList.remove("d-none");
  areaTag.classList.add("d-none");
  ingredientTag.classList.add("d-none");
  contactUsTag.classList.replace("d-flex", "d-none");
  detailsTag.classList.add("d-none");
  clearInputs();
  closeSideNaveMenu();
  getCategories();
});

// ============== Area Link ==============
navUl.children[2].addEventListener("click", function () {
  mainTag.classList.add("d-none");
  searchTag.classList.add("d-none");
  categoriesTag.classList.add("d-none");
  areaTag.classList.remove("d-none");
  ingredientTag.classList.add("d-none");
  contactUsTag.classList.replace("d-flex", "d-none");
  detailsTag.classList.add("d-none");
  clearInputs();
  closeSideNaveMenu();
  getArea();
});

// ============== Ingredient Link ==============
navUl.children[3].addEventListener("click", function () {
  mainTag.classList.add("d-none");
  searchTag.classList.add("d-none");
  categoriesTag.classList.add("d-none");
  areaTag.classList.add("d-none");
  ingredientTag.classList.remove("d-none");
  contactUsTag.classList.replace("d-flex", "d-none");
  detailsTag.classList.add("d-none");
  clearInputs();
  closeSideNaveMenu();
  getIngredient();
});

// ============== Contact-US Link ==============
navUl.children[4].addEventListener("click", function () {
  mainTag.classList.add("d-none");
  searchTag.classList.add("d-none");
  categoriesTag.classList.add("d-none");
  areaTag.classList.add("d-none");
  ingredientTag.classList.add("d-none");
  contactUsTag.classList.replace("d-none", "d-flex");
  detailsTag.classList.add("d-none");
  clearInputs();
  closeSideNaveMenu();
});

// CLEAR INPUTS
function clearInputs() {
  searchTag.firstElementChild.firstElementChild.firstElementChild.firstElementChild.value = "";
  searchTag.firstElementChild.firstElementChild.lastElementChild.firstElementChild.value = "";

  let contactInput = document.querySelectorAll("#contactUs .row input");
  for (let i = 0; i < contactInput.length; i++) {
    contactInput[i].value = "";
    contactInput[i].classList.remove("is-invalid");
    contactInput[i].classList.remove("is-valid");
    contactInput[i].nextElementSibling.classList.add("d-none");
  }
}
// ==================================================================
// ==================================================================
// ==================================================================
let searchByName = document.querySelector("#searchByName");
let searchByFirstLetter = document.querySelector("#searchByFirstLetter");
let nameInput = document.querySelector("#nameInput");
let emailInput = document.querySelector("#emailInput");
let phoneInput = document.querySelector("#phoneInput");
let ageInput = document.querySelector("#ageInput");
let passwordInput = document.querySelector("#passwordInput");
let repasswordInput = document.querySelector("#repasswordInput");
let btnSubmit = document.querySelector("#btnSubmit");
let mealDetailsItem = document.querySelector("#mealDetails");
let searchLoader = document.querySelector("#searchLoader");
let categoriesLoader = document.querySelector("#categoriesLoader");
let areaLoader = document.querySelector("#areaLoader");
let ingredientLoader = document.querySelector("#ingredientLoader");
let detailsLoader = document.querySelector("#detailsLoader");
let listCategories = [];
let listIngredient = [];
let listMeals = [];
let listArea = [];
let allMealDetails;

getRandomMeals();

// ============== Random Meals ==============
async function getRandomMeals() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s"
  );
  let data = await response.json();
  listMeals = data["meals"];
  document.querySelector("#meals").innerHTML = displayMeals();
  selectMeals();
}

// ============== Searched Meals By Name ==============
searchByName.addEventListener("input", getSearchedMealsByName);
async function getSearchedMealsByName() {
  searchLoader.classList.remove("d-none");

  let mealName = searchByName.value;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let data = await response.json();

  if (data) {
    searchLoader.classList.add("d-none");
  }

  listMeals = data["meals"];
  document.querySelector("#searchedMeals").innerHTML = displayMeals();
  selectSearchedMeals();
}

// ============== Searched Meals By First Letter ==============
searchByFirstLetter.addEventListener("keyup", function (e) {
  getSearchedMealsByFirstLetter();
  if (e.key == "Backspace") {
    searchLoader.classList.add("d-none");
  }
});
async function getSearchedMealsByFirstLetter() {
  searchLoader.classList.remove("d-none");

  let mealLetter = searchByFirstLetter.value;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`
  );
  let data = await response.json();

  if (data) {
    searchLoader.classList.add("d-none");
  }

  listMeals = data["meals"];
  document.querySelector("#searchedMeals").innerHTML = displayMeals();
  selectSearchedMeals();
}

// ============== Get Categories ==============
async function getCategories() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await response.json();

  if (data) {
    categoriesLoader.classList.add("d-none");
  }

  listCategories = data["categories"];
  document.querySelector("#mealCategories").innerHTML = displayCategories();

  selectItemInCategory();
}

// ============== Display Meals ==============
function displayMeals() {
  let cartona = "";
  for (let i = 0; i < listMeals.length; i++) {
    cartona += `
          <div class="col-md-3">
              <div class="item rounded-4 overflow-hidden position-relative">
                  <img class="w-100" src="${listMeals[i]["strMealThumb"]}" alt="">
                  <div class="img-content px-2 d-flex align-items-center position-absolute">
                      <h2>${listMeals[i]["strMeal"]}</h2>
                  </div>
              </div>
          </div>`;
  }
  return cartona;
}

// ============== Display Categories ==============
function displayCategories() {
  let cartona = "";
  for (let i = 0; i < listCategories.length; i++) {
    cartona += `
          <div class="col-md-3">
              <div class="item rounded-4 overflow-hidden position-relative">
                  <img class="w-100" src="${
                    listCategories[i]["strCategoryThumb"]
                  }" alt="">
                  <div class="img-content px-2 text-center position-absolute">
                      <h2>${listCategories[i]["strCategory"]}</h2>
                      <p>${listCategories[i]["strCategoryDescription"]
                        .split(" ")
                        .splice(0, 20)
                        .join(" ")}</p>
                  </div>
              </div>
          </div>`;
  }
  return cartona;
}

// ============== Display Area ==============
function displayArea() {
  let cartona = "";
  for (let i = 0; i < listArea.length; i++) {
    cartona += `
          <div class="col-md-3 text-white text-center">
             <div class='item'>
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${listArea[i]["strArea"]}</h3>
             </div>
          </div>`;
  }
  return cartona;
}

// ============== Display Ingredient ==============
function displayIngredient() {
  let cartona = "";
  for (let i = 0; i < 30; i++) {
    if (listIngredient[i]["strDescription"] != null) {
      cartona += `
          <div class="col-md-3">
              <div class="item text-white text-center">
                  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                  <h3>${listIngredient[i]["strIngredient"]}</h3>
                  <p>${listIngredient[i]["strDescription"]
                    .split(" ")
                    .splice(0, 20)
                    .join(" ")}</p>
              </div>
          </div>`;
    }
  }
  return cartona;
}

// ============== Filter by Category ==============
async function getFilteredMealsByCategories(categorieName) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorieName}`
  );
  let data = await response.json();
  listMeals = data["meals"];
  document.querySelector("#meals").innerHTML = displayMeals();
  selectMeals();

  mainTag.classList.remove("d-none");
  searchTag.classList.add("d-none");
  categoriesTag.classList.add("d-none");
}

// ==============  SELECT ITEM IN CATEGORY ==============
function selectItemInCategory() {
  let categoriesItem = document.querySelectorAll("#mealCategories .item");
  for (let i = 0; i < categoriesItem.length; i++) {
    categoriesItem[i].addEventListener("click", function (e) {
      let name = this.lastElementChild.firstElementChild.innerHTML;
      getFilteredMealsByCategories(name);
    });
  }
}

// ============== Filter by Area ==============
async function getFilteredMealsByArea(nameArea) {
  let response = await fetch(
    ` https://www.themealdb.com/api/json/v1/1/filter.php?a=${nameArea}`
  );
  let data = await response.json();
  listMeals = data["meals"];
  document.querySelector("#meals").innerHTML = displayMeals();
  selectMeals();

  mainTag.classList.remove("d-none");
  searchTag.classList.add("d-none");
  categoriesTag.classList.add("d-none");
  areaTag.classList.add("d-none");
}

// ==============  SELECT ITEM IN Area ==============
function selectItemInArea() {
  let areaItem = document.querySelectorAll("#mealArea .item");
  for (let i = 0; i < areaItem.length; i++) {
    areaItem[i].addEventListener("click", function (e) {
      let nameArea = this.lastElementChild.innerHTML;
      getFilteredMealsByArea(nameArea);
    });
  }
}

// ============== AREA ==============
async function getArea() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await response.json();

  if (data) {
    areaLoader.classList.add("d-none");
  }

  listArea = data["meals"];
  document.querySelector("#mealArea").innerHTML = displayArea();

  selectItemInArea();
}

// ============== Filter by Ingredient ==============
async function getFilteredMealsByIngredient(nameIngredient) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${nameIngredient}`
  );
  let data = await response.json();
  listMeals = data["meals"];
  document.querySelector("#meals").innerHTML = displayMeals();
  selectMeals();

  mainTag.classList.remove("d-none");
  searchTag.classList.add("d-none");
  categoriesTag.classList.add("d-none");
  areaTag.classList.add("d-none");
  ingredientTag.classList.add("d-none");
}

// ==============  SELECT ITEM IN Ingredient ==============
function selectItemInIngredient() {
  let ingredientItem = document.querySelectorAll("#mealIngredient .item");
  for (let i = 0; i < ingredientItem.length; i++) {
    ingredientItem[i].addEventListener("click", function (e) {
      let nameIngredient = this.children[1].innerHTML;
      getFilteredMealsByIngredient(nameIngredient);
    });
  }
}

// ============== Ingredient ==============
async function getIngredient() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await response.json();

  if (data) {
    ingredientLoader.classList.add("d-none");
  }

  listIngredient = data["meals"];
  console.log(listIngredient[0]["strDescription"]);
  document.querySelector("#mealIngredient").innerHTML = displayIngredient();

  selectItemInIngredient();
}

// ============== Meal Details ==============
async function getMealDetails(mealName) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let data = await response.json();

  if (data) {
    detailsLoader.classList.add("d-none");
  }

  allMealDetails = data["meals"][0];
  displayMealDetails();
}

// ============== Select Item In Meal ==============
function selectMeals() {
  let meal = document.querySelectorAll("#main #meals .item");
  for (let i = 0; i < meal.length; i++) {
    meal[i].addEventListener("click", function () {
      mainTag.classList.add("d-none");
      searchTag.classList.add("d-none");
      detailsTag.classList.remove("d-none");

      let mealName = this.lastElementChild.firstElementChild.innerHTML;
      console.log(mealName);
      getMealDetails(mealName);
    });
  }
}

// ============== Select Item In Searched Meals ==============
function selectSearchedMeals() {
  let meal = document.querySelectorAll("#search #searchedMeals .item");
  for (let i = 0; i < meal.length; i++) {
    meal[i].addEventListener("click", function () {
      searchTag.classList.add("d-none");
      detailsTag.classList.remove("d-none");

      let mealName = this.lastElementChild.firstElementChild.innerHTML;
      console.log(mealName);
      getMealDetails(mealName);
    });
  }
}

// ============== Display Meal Deatails ==============
function displayMealDetails() {
  mealDetailsItem.firstElementChild.firstElementChild.firstElementChild.setAttribute(
    "src",
    allMealDetails["strMealThumb"]
  );
  mealDetailsItem.firstElementChild.firstElementChild.lastElementChild.innerHTML =
    allMealDetails["strMeal"];
  mealDetailsItem.lastElementChild.children[1].innerHTML =
    allMealDetails["strInstructions"];
  mealDetailsItem.lastElementChild.children[2].lastChild.textContent =
    allMealDetails["strArea"];
  mealDetailsItem.lastElementChild.children[3].lastChild.textContent =
    allMealDetails["strCategory"];
  mealDetailsItem.lastElementChild.children[5].innerHTML = mealRecipes();
  mealDetailsItem.lastElementChild.children[7].innerHTML = mealTags();
  mealDetailsItem.lastElementChild.children[8].firstElementChild.setAttribute(
    "href",
    allMealDetails["strSource"]
  );
  mealDetailsItem.lastElementChild.children[9].firstElementChild.setAttribute(
    "href",
    allMealDetails["strYoutube"]
  );
}

// ============== Recipes ==============
function mealRecipes() {
  let recipes = "";
  for (let i = 1; i < 20; i++) {
    if (
      allMealDetails[`strMeasure${i}`] &&
      allMealDetails[`strIngredient${i}`]
    ) {
      recipes += `<li>${allMealDetails[`strMeasure${i}`]} ${
        allMealDetails[`strIngredient${i}`]
      }</li>`;
    }
  }
  return recipes;
}

// ============== Tags ==============
function mealTags() {
  let tags = allMealDetails["strTags"]?.split(",");
  let tag = "";
  for (let i = 0; i < tags?.length; i++) {
    tag += `<li class="alert alert-danger p-1">${tags[i]}</li>`;
  }
  return tag;
}

// ==================================================================
// ==================================================================
// ==================================================================
// ============== START VALIDATE ==============
function validate(input) {
  let regex = {
    nameInput: /^[A-za-z\s]{3,30}$/,
    emailInput: /^[\w]+@[A-Za-z]{2,6}\.[A-Za-z]{2,6}$/,
    phoneInput: /^01[0125][0-9]{8}$/,
    ageInput: /^[1-9][0-9]$/,
    passwordInput: /^(?=.*[0-9])(?=.*[_!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{7,16}$/,
    repasswordInput: /^(?=.*[0-9])(?=.*[_!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{7,16}$/,
  };

  if (regex[input.id].test(input.value)) {
    input.nextElementSibling.classList.add("d-none");
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.nextElementSibling.classList.remove("d-none");
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }

  if (
    nameInput.classList.contains("is-valid") &&
    emailInput.classList.contains("is-valid") &&
    phoneInput.classList.contains("is-valid") &&
    ageInput.classList.contains("is-valid") &&
    passwordInput.classList.contains("is-valid") &&
    repasswordInput.classList.contains("is-valid")
  ) {
    btnSubmit.classList.remove("disabled");
  } else {
    btnSubmit.classList.add("disabled");
  }
}

nameInput.addEventListener("input", function () {
  validate(this);
});

emailInput.addEventListener("input", function () {
  validate(this);
});

phoneInput.addEventListener("input", function () {
  validate(this);
});

ageInput.addEventListener("input", function () {
  validate(this);
});

passwordInput.addEventListener("input", function () {
  validate(this);
  if (repasswordInput.value == passwordInput.value) {
    repasswordInput.classList.add("is-valid");
    repasswordInput.classList.remove("is-invalid");
  } else {
    repasswordInput.classList.add("is-invalid");
    repasswordInput.classList.remove("is-valid");
  }
});

repasswordInput.addEventListener("input", function () {
  if (repasswordInput.value == passwordInput.value) {
    repasswordInput.classList.add("is-valid");
    repasswordInput.classList.remove("is-invalid");
  } else {
    repasswordInput.classList.add("is-invalid");
    repasswordInput.classList.remove("is-valid");
  }
});
// ============== END VALIDATE ==============
