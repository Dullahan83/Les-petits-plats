import SearchAndFilter from "./filters.js";
import Recipe from "./recipeObject.js";

export default class Liste {
   constructor(data) {
      this.list = data;
      this.displayRecipes(this.list);
      // this.initFilters();
   }

   displayRecipes(list) {
      const container = document.querySelector(".container");
      container.innerHTML = "";
      list.forEach((recipe) => {
         const recipeObject = new Recipe(recipe);
         recipeObject.createRecipeCard(container);
      });
   }

   // initFilters() {
   //    const filters = new SearchAndFilter(this.list);
   // }
}
