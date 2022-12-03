import { createRecipeCard } from "../utils/createRecipeCard.js";
export default class Liste {
   constructor(data) {
      this.list = data;
      this.displayRecipes(this.list);
   }

   displayRecipes(list) {
      const container = document.querySelector(".container");
      container.innerHTML = "";
      list.forEach((recipe) => {
         createRecipeCard(recipe, container);
      });
   }
}
