import Liste from "./recipeList.js";

export default class SearchAndFilter extends Liste {
   #originalList;
   constructor(data) {
      super(data);
      this.#originalList = data;
      this.listResult = [];
      this.ingredientList = [];
      this.ustensilList = [];
      this.applianceList = [];
      this.ingredientFilter = [];
      this.ustensilFilter = [];
      this.applianceFilter = [];
      this.init(this.#originalList);
      // this.#populateFilterList(this.listResult);
   }

   init(list) {
      this.initFilters(list);
      this.initEvents();
   }
   //
   initFilters(list) {
      this.createIngredientFilterList(list);
      this.createUstensilsFilterList(list);
      this.createAppliancesFilterList(list);
   }

   initEvents() {
      this.handleMainSearch();
   }

   //Create initial ingredient list
   createIngredientFilterList(list) {
      this.ingredientList = [];
      list.forEach((recipe) => {
         recipe.ingredients.forEach((element) => {
            let caps = element.ingredient.replace(
               element.ingredient[0],
               element.ingredient[0].toUpperCase()
            );
            !this.ingredientList.includes(caps) &&
               this.ingredientList.push(caps);
         });
      });
      const directory = document.getElementById("ingredients-list");
      directory.innerHTML = "";
      this.ingredientList
         .sort((a, b) => (a > b ? 1 : -1))
         .forEach((element) => this.createDomFilter(directory, element));
   }

   //create initial ustensil list
   createUstensilsFilterList(list) {
      this.ustensilList = [];
      list.forEach((recipe) => {
         recipe.ustensils.forEach((element) => {
            let caps = element.replace(element[0], element[0].toUpperCase());
            !this.ustensilList.includes(caps) && this.ustensilList.push(caps);
         });
      });
      const directory = document.getElementById("ustensils-list");
      directory.innerHTML = "";
      this.ustensilList
         .sort((a, b) => (a > b ? 1 : -1))
         .forEach((element) => this.createDomFilter(directory, element));
   }

   //create initial appliance list
   createAppliancesFilterList(list) {
      this.applianceList = [];
      list.forEach((recipe) => {
         if (recipe.appliance) {
            if (typeof recipe.appliance != "string") {
               recipe.appliance.forEach((element) => {
                  let caps = element.replace(
                     element[0],
                     element[0].toUpperCase()
                  );
                  !this.applianceList.includes(caps) &&
                     this.applianceList.push(caps);
               });
            } else {
               let caps = recipe.appliance.replace(
                  recipe.appliance[0],
                  recipe.appliance[0].toUpperCase()
               );

               !this.applianceList.includes(caps) &&
                  this.applianceList.push(caps);
            }
         }
      });
      const directory = document.getElementById("appliances-list");
      directory.innerHTML = "";
      this.applianceList
         .sort((a, b) => (a > b ? 1 : -1))
         .forEach((element) => this.createDomFilter(directory, element));
   }

   // Create one item of the filter-lists
   createDomFilter(directory, name) {
      const filter = document.createElement("li");
      const check = document.createElement("input");
      check.setAttribute("type", "checkbox");
      check.setAttribute("id", name.toLowerCase());
      check.setAttribute("name", name.toLowerCase());
      check.setAttribute("aria-label", name.toLowerCase());

      const label = document.createElement("label");
      label.setAttribute("for", name.toLowerCase());
      label.textContent = name;
      filter.append(check, label);
      directory.append(filter);

      label.addEventListener("click", () => {
         let family = "";
         switch (directory.id) {
            case "ingredients-list":
               family = "ingredients";
               if (!this.ingredientFilter.includes(name)) {
                  this.ingredientFilter.push(name);
                  this.createFilterCard(name, "ingredients");
                  this.handleSearchByFilter();
               }

               break;
            case "appliances-list":
               family = "appliances";
               if (!this.applianceFilter.includes(name)) {
                  this.applianceFilter.push(name);
                  this.createFilterCard(name, "appliances");
                  this.handleSearchByFilter();
               }
               break;
            case "ustensils-list":
               family = "ustensils";
               if (!this.ustensilFilter.includes(name)) {
                  this.ustensilFilter.push(name);
                  this.createFilterCard(name, "ustensils");
                  this.handleSearchByFilter();
               }
               break;
            default:
               break;
         }
      });
   }

   // create filter thumbnails
   createFilterCard(name, family) {
      const directory = document.getElementById("filter-choice");
      const card = document.createElement("div");
      const cardText = document.createElement("p");
      const button = document.createElement("button");
      const deleteIcon = document.createElement("i");

      card.setAttribute("class", family);
      cardText.textContent = name;
      deleteIcon.setAttribute("class", "fa-regular fa-circle-xmark");
      button.setAttribute("aria-label", `Remove ${name} from filter list`);
      directory.appendChild(card);
      card.append(cardText, button);
      button.appendChild(deleteIcon);

      button.addEventListener("click", () => {
         card.remove();
         if (family === "ingredients") {
            this.ingredientFilter = this.ingredientFilter.filter(
               (ingredient) => ingredient != name
            );
         } else if (family === "appliances")
            this.applianceFilter = this.applianceFilter.filter(
               (ingredient) => ingredient != name
            );
         if (family === "ustensils")
            this.ustensilFilter = this.ustensilFilter.filter(
               (ingredient) => ingredient != name
            );
         this.listResult = [];
         this.handleSearchByFilter();
         console.log(this.ingredientFilter);
         console.log(this.applianceFilter);
         console.log(this.ustensilFilter);
      });
   }

   handleMainSearch() {
      let list =
         this.listResult.length != 0 ? this.listResult : this.#originalList;
      const input = document.getElementById("search");
      input.addEventListener("input", () => {
         if (input.value.length >= 3) {
            this.listResult = list.filter((recipe) => {
               if (
                  recipe.ingredients.some((element) =>
                     element.ingredient
                        .toLowerCase()
                        .includes(input.value.toLowerCase().trim())
                  )
               ) {
                  return recipe;
               } else if (
                  recipe.name
                     .toLowerCase()
                     .includes(input.value.toLowerCase().trim())
               ) {
                  return recipe;
               } else if (
                  recipe.description
                     .toLowerCase()
                     .includes(input.value.toLowerCase().trim())
               ) {
                  return recipe;
               }
            });

            if (this.listResult.length === 0) {
               this.displayNoResult();
            } else {
               this.displayRecipes(this.listResult);
               this.initFilters(this.listResult);
            }
         } else if (input.value.length < 3 && input.value.length + 1 === 3) {
            this.displayRecipes(this.#originalList);
            this.initFilters(this.#originalList);
         }
         console.log(this.listResult);
      });
   }

   handleSearchByFilter() {
      let list =
         this.listResult.length != 0 ? this.listResult : this.#originalList;
      console.log(list);

      if (this.ingredientFilter.length != 0) {
         console.log(this.ingredientFilter);
         this.ingredientFilter.forEach((ingredient) => {
            console.log(ingredient);
            this.listResult = list.filter((recipe) => {
               if (
                  recipe.ingredients.some((element) =>
                     element.ingredient
                        .toLowerCase()
                        .includes(ingredient.toLowerCase())
                  )
               ) {
                  // console.log(recipe);
                  return recipe;
               }
            });
         });
      }
      if (this.applianceFilter.length != 0) {
         console.log(this.applianceFilter);
         this.applianceFilter.forEach((appliance) => {
            console.log(appliance);
            this.listResult = list.filter((recipe) => {
               if (
                  recipe.appliance
                     .toLowerCase()
                     .includes(appliance.toLowerCase())
               ) {
                  return recipe;
               }
            });
         });
      }
      if (this.ustensilFilter.length != 0) {
         console.log(this.ustensilFilter);
         this.ustensilFilter.forEach((ustensil) => {
            console.log(ustensil);

            this.listResult = list.filter((recipe) => {
               if (
                  recipe.ustensils.some((element) =>
                     element.toLowerCase().includes(ustensil.toLowerCase())
                  )
               ) {
                  console.log(ustensil + "trouvé");
                  return recipe;
               }
            });
         });
      }
      if (this.listResult.length === 0) {
         this.listResult = this.#originalList;
      }
      console.log(this.listResult);
      this.displayRecipes(this.listResult);
      this.initFilters(this.listResult);
   }

   displayNoResult() {
      const container = document.querySelector(".container");
      const noResult = document.createElement("h2");
      noResult.setAttribute("class", "no-result");
      container.innerHTML = "";
      noResult.textContent =
         "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
      container.appendChild(noResult);
   }
}
