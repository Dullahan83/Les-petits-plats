export default class Recipe {
   #recipe;
   constructor({ ...recipe }) {
      this.#recipe = { ...recipe };
   }
   createRecipeCard(directory) {
      //create base dom element for recipe
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figCaption = document.createElement("figcaption");
      const captionHeader = document.createElement("div");
      const recipeName = document.createElement("h2");
      const timeContainer = document.createElement("span");
      const clockIcon = document.createElement("i");
      const time = document.createElement("h2");
      const recipeContainer = document.createElement("div");
      const ingredientList = document.createElement("ul");
      const recipeInstruction = document.createElement("p");

      directory.appendChild(figure);
      figure.append(img, figCaption);
      figCaption.append(captionHeader, recipeContainer);
      captionHeader.append(recipeName, timeContainer);
      timeContainer.append(clockIcon, time);
      recipeContainer.append(ingredientList, recipeInstruction);

      //create dynamic dom elements
      //<==========================================================>
      for (let i = 0; i < this.#recipe.ingredients.length; i++) {
         const ingredient = document.createElement("li");
         const ingredientName = document.createElement("h3");
         const ingredientQuantity = document.createElement("p");
         // ingredientQuantity.setAttribute("title", `&& ${this.#recipe.ingredients[i].quantity} ${this.#recipe.ingredients[i]}`)

         ingredient.appendChild(ingredientName);
         this.#recipe.ingredients[i].quantity &&
            ingredient.appendChild(ingredientQuantity);

         this.#recipe.ingredients[i].unit &&
            this.#recipe.ingredients[i].unit.includes("gram") &&
            (this.#recipe.ingredients[i].unit = "g");

         this.#recipe.ingredients[i].unit &&
            this.#recipe.ingredients[i].unit.includes("cuil") &&
            (this.#recipe.ingredients[i].unit =
               this.#recipe.ingredients[i].quantity > 1
                  ? "cuillères à s..."
                  : "cuillère à s...");

         ingredientName.textContent = this.#recipe.ingredients[i].quantity
            ? `${this.#recipe.ingredients[i].ingredient}:`
            : `${this.#recipe.ingredients[i].ingredient}`;
         ingredientQuantity.textContent = this.#recipe.ingredients[i].unit
            ? this.#recipe.ingredients[i].unit.length > 3
               ? `${this.#recipe.ingredients[i].quantity} ${
                    this.#recipe.ingredients[i].unit
                 }`
               : `${this.#recipe.ingredients[i].quantity}${
                    this.#recipe.ingredients[i].unit
                 }`
            : ` ${this.#recipe.ingredients[i].quantity}`;

         // console.log(figure);
         ingredientList.appendChild(ingredient);
      }
      //set Attributes and fill infos
      //<==========================================================>
      img.setAttribute("src", "./assets/image/recipe.jpg");
      img.setAttribute("alt", "recipe photo");
      clockIcon.setAttribute("class", "fa-regular fa-clock");
      recipeContainer.setAttribute("class", "instructions");
      recipeInstruction.setAttribute("class", "instructions-text");
      recipeName.setAttribute("class", "recipe-name");

      recipeName.textContent = this.#recipe.name;
      time.textContent = `${this.#recipe.time} min`;
      recipeInstruction.textContent = this.#recipe.description;
      // console.log(this.#recipe.ingredients);
   }
}
