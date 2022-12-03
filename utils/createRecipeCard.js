export function createRecipeCard(recipe, directory) {
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
   for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredient = document.createElement("li");
      const ingredientName = document.createElement("h3");
      const ingredientQuantity = document.createElement("p");
      // ingredientQuantity.setAttribute("title", `&& ${recipe.ingredients[i].quantity} ${recipe.ingredients[i]}`)

      ingredient.appendChild(ingredientName);
      recipe.ingredients[i].quantity &&
         ingredient.appendChild(ingredientQuantity);

      recipe.ingredients[i].unit &&
         recipe.ingredients[i].unit.includes("gram") &&
         (recipe.ingredients[i].unit = "g");

      recipe.ingredients[i].unit &&
         recipe.ingredients[i].unit.includes("cuil") &&
         (recipe.ingredients[i].unit =
            recipe.ingredients[i].quantity > 1
               ? "cuillères à s..."
               : "cuillère à s...");

      ingredientName.textContent = recipe.ingredients[i].quantity
         ? `${recipe.ingredients[i].ingredient}:`
         : `${recipe.ingredients[i].ingredient}`;
      ingredientQuantity.textContent = recipe.ingredients[i].unit
         ? recipe.ingredients[i].unit.length > 3
            ? `${recipe.ingredients[i].quantity} ${recipe.ingredients[i].unit}`
            : `${recipe.ingredients[i].quantity}${recipe.ingredients[i].unit}`
         : ` ${recipe.ingredients[i].quantity}`;

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

   recipeName.textContent = recipe.name;
   time.textContent = `${recipe.time} min`;
   recipeInstruction.textContent = recipe.description;
   // console.log(recipe.ingredients);
}
