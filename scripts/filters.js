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
   }
   /**
    * @param {[recipeObjectList]} list 
    */
   init(list) {
      this.initFilters(list);
      this.initEvents();
   }
   /**
    * call functions to create the filter lists
    * @param {[recipeObjectList]} list 
    */
   initFilters(list) {
      this.createIngredientFilterList(list);
      this.createUstensilsFilterList(list);
      this.createAppliancesFilterList(list);
   }
   //initialise necessary events
   initEvents() {
      this.handleMainSearch();
      this.handleFilterInputs();
      this.handleDisplayingFilterList();
   }

   /**
    * @param {[recipeObjectList]} list 
    */
   createIngredientFilterList(list) {
      this.ingredientList = [];
      //normalize capitalization
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
      // Filter element already chosen from list
      this.ingredientFilter.length != 0 &&
         this.ingredientFilter.forEach((filter) => {
            this.ingredientList = this.ingredientList.filter(
               (element) => element != filter
            );
         });
      const directory = document.getElementById("ingredients-list");
      directory.innerHTML = "";
      this.ingredientList
         // .sort((a, b) => (a > b ? 1 : -1))
         .forEach((element) => this.createDomFilter(directory, element));
   }

   /**
    *  @param {[recipeObjectList]} list 
    */
   createUstensilsFilterList(list) {
      this.ustensilList = [];
      //normalize capitalization
      list.forEach((recipe) => {
         recipe.ustensils.forEach((element) => {
            let caps = element.replace(element[0], element[0].toUpperCase());
            !this.ustensilList.includes(caps) && this.ustensilList.push(caps);
         });
      });
      // Filter element already chosen from list
      this.ustensilFilter.length != 0 &&
         this.ustensilFilter.forEach((filter) => {
            this.ustensilList = this.ustensilList.filter(
               (element) => element != filter
            );
         });
      const directory = document.getElementById("ustensils-list");
      directory.innerHTML = "";
      this.ustensilList
         // .sort((a, b) => (a > b ? 1 : -1))
         .forEach((element) => this.createDomFilter(directory, element));
   }

   /**
     *  @param {[recipeObjectList]} list 
     */
   createAppliancesFilterList(list) {
      this.applianceList = [];
      //normalize capitalization
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
      // Filter element already chosen from list
      this.applianceFilter.length != 0 &&
         this.applianceFilter.forEach((filter) => {
            this.applianceList = this.applianceList.filter(
               (element) => element != filter
            );
         });
      const directory = document.getElementById("appliances-list");
      directory.innerHTML = "";
      this.applianceList
         .sort((a, b) => (a > b ? 1 : -1))
         .forEach((element) => this.createDomFilter(directory, element));
   }

   /**
    * Create one item of the filter-lists
    * @param {HTMLcollection} directory 
    * @param {string} name 
    */
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

      //on click create filter thumbnail and use search by filter method
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
               document.getElementById(family).value = ""
               break;
            case "appliances-list":
               family = "appliances";
               if (!this.applianceFilter.includes(name)) {
                  this.applianceFilter.push(name);
                  this.createFilterCard(name, "appliances");
                  this.handleSearchByFilter();
               }
               document.getElementById(family).value = ""
               break;
            case "ustensils-list":
               family = "ustensils";
               if (!this.ustensilFilter.includes(name)) {
                  this.ustensilFilter.push(name);
                  this.createFilterCard(name, "ustensils");
                  this.handleSearchByFilter();
               }
               document.getElementById(family).value = ""
               break;
            default:
               break;

         }
         directory.classList.remove("grid")
      });
   }

   /**
    * create filter thumbnails
    * @param {string} name 
    * @param {string} family 
    */
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

      // on click remove targeted dom element and element from choosen filter list
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
         this.handleMainSearch()
         this.handleSearchByFilter();
      });
   }

   // handle the search by main input
   handleMainSearch() {
      // if list result is empty use original list
      let list =
         this.listResult.length != 0 ? this.listResult : this.#originalList;
      const input = document.getElementById("search");
      this.mainSearch(list)
      input.addEventListener("input", () => {
         this.mainSearch(list)
      });
   }
   /**
    * 
    * @param {object[]} list 
    * @param {HTMLElement} input 
    */
   mainSearch(list) {
      const input = document.getElementById("search");

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
                  .includes(input.value.toLowerCase().trim()) ||
               recipe.description
                  .toLowerCase()
                  .includes(input.value.toLowerCase().trim())
            ) {
               return recipe;
            }
         });

         if (this.listResult.length === 0) {
            this.displayNoResult();
            this.initFilters(this.listResult)
         } else {
            this.handleSearchByFilter()
            // this.initFilters(this.listResult)
         }
      } else if (input.value.length < 3 && input.value.length + 1 === 3) {
         this.listResult = [];
         this.handleSearchByFilter();
      }
   }
   // handle the filter by input in filter list

   handleFilterInputs() {
      const inputs = document.querySelectorAll(".filter-container div input");
      inputs.forEach((input) => {
         let directory = document.getElementById(`${input.id}-list`);

         input.addEventListener("input", () => {
            if (input.value.length >= 3) {
               directory.classList.add("grid");
               switch (input.id) {
                  case "ingredients":
                     this.ingredientList = this.ingredientList.filter(
                        (ingredient) =>
                           ingredient
                              .toLowerCase()
                              .includes(input.value.trim().toLowerCase())
                     );
                     directory.innerHTML = "";
                     this.ingredientList.forEach((element) =>
                        this.createDomFilter(directory, element)
                     );

                     break;
                  case "appliances":
                     this.applianceList = this.applianceList.filter(
                        (appliance) =>
                           appliance
                              .toLowerCase()
                              .includes(input.value.trim().toLowerCase())
                     );
                     directory.innerHTML = "";

                     this.applianceList.forEach((element) =>
                        this.createDomFilter(directory, element)
                     );
                     break;
                  case "ustensils":
                     this.ustensilList = this.ustensilList.filter((ustensil) =>
                        ustensil
                           .toLowerCase()
                           .includes(input.value.trim().toLowerCase())
                     );
                     directory.innerHTML = "";

                     this.ustensilList.forEach((element) =>
                        this.createDomFilter(directory, element)
                     );
                     break;
                  default:
                     break;
               }
            } else if (input.value.length < 3) {
               if (!directory.parentNode.classList.contains("menu-open")) {
                  directory.classList.remove("grid");
                  this.listResult.length > 0
                     ? this.initFilters(this.listResult)
                     : this.initFilters(this.#originalList);

               } else {
                  this.listResult.length > 0
                     ? this.initFilters(this.listResult)
                     : this.initFilters(this.#originalList);
               }
            }
         });
      });
   }

   //handle the recipe search by filters choice
   handleSearchByFilter() {
      // if list result is empty use original list
      let list =
         this.listResult.length != 0 ? this.listResult : this.#originalList;
      if (this.ingredientFilter.length != 0) {
         this.ingredientFilter.forEach((ingredient) => {
            this.listResult = list.filter((recipe) => {
               if (
                  recipe.ingredients.some((element) =>
                     element.ingredient
                        .toLowerCase()
                     === ingredient.toLowerCase()
                  )
               ) {
                  return recipe;
               }
            });
         });
         list = this.listResult;
      }
      if (this.applianceFilter.length != 0) {
         this.applianceFilter.forEach((appliance) => {
            this.listResult = list.filter((recipe) => {
               if (
                  recipe.appliance
                     .toLowerCase()
                  === appliance.toLowerCase()
               ) {
                  return recipe;
               }
            });
         });
         list = this.listResult;
      }
      if (this.ustensilFilter.length != 0) {
         this.ustensilFilter.forEach((ustensil) => {
            this.listResult = list.filter((recipe) => {
               if (
                  recipe.ustensils.some((element) =>
                     element.toLowerCase() === ustensil.toLowerCase()
                  )
               ) {
                  return recipe;
               }
            });
         });
         list = this.listResult;
      }
      if (this.listResult.length === 0) {
         this.listResult = this.#originalList;
      }
      this.displayRecipes(this.listResult);
      this.initFilters(this.listResult);
   }

   // display message when no result is returned
   displayNoResult() {
      const container = document.querySelector(".container");
      const noResult = document.createElement("h2");
      noResult.setAttribute("class", "no-result");
      container.innerHTML = "";
      noResult.textContent =
         "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
      container.appendChild(noResult);
   }

   //handle the display on click of the filter list
   handleDisplayingFilterList() {
      const buttons = document.querySelectorAll(".filter-container div label");
      buttons.forEach((btn) => {
         btn.addEventListener("click", () => {
            const parent = btn.closest(".filter-container");
            const previous = btn.previousElementSibling;
            for (let i = 0; i < buttons.length; i++) {
               if (buttons[i].previousElementSibling.id != previous.id) {
                  buttons[i]
                     .closest(".filter-container")
                     .classList.remove("menu-open");
                  buttons[i].previousElementSibling.value = ""
                  buttons[i].closest(".filter-container").querySelector("ul").classList.remove("grid");
                  const list = this.listResult.length > 0 ? this.listResult : this.#originalList;
                  this.initFilters(list)
               }
               if (previous.value.length < 3) {
                  parent.querySelector("ul").classList.remove("grid");
               }
            }
            if (parent.classList.contains("menu-open")) {
               parent.classList.remove("menu-open");
            } else {
               parent.classList.add("menu-open");
            }
         });
      });
   }


   // native loop version
   // handleMainSearch() {
   //    let list =
   //       this.listResult.length != 0 ? this.listResult : this.#originalList;
   //    const input = document.getElementById("search");
   //    input.addEventListener("input", () => {
   //       if (input.value.length >= 3) {
   //          let array = [];
   //          for (let recipe of list) {
   //             let match = [];
   //             for (let element of recipe.ingredients) {
   //                if (
   //                   element.ingredient
   //                      .toLowerCase()
   //                      .includes(input.value.trim().toLowerCase())
   //                ) {
   //                   match.push(recipe);
   //                }
   //             }
   //             if (
   //                match.length != 0 ||
   //                recipe.description
   //                   .toLowerCase()
   //                   .includes(input.value.trim().toLowerCase()) ||
   //                recipe.name
   //                   .toLowerCase()
   //                   .includes(input.value.trim().toLowerCase())
   //             ) {
   //                array.push(recipe);
   //             }
   //          }
   //          this.listResult = array;
   //          if (this.listResult.length === 0) {
   //             this.displayNoResult();
   //          } else {
   //             this.handleSearchByFilter()
   //          }
   //       } else if (input.value.length < 3 && input.value.length + 1 === 3) {
   //          this.listResult = [];
   //          this.handleSearchByFilter();
   //       }
   //    });
   // }
}

/**ahmadouwalyndiaye@gmail.com */