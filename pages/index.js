import SearchAndFilter from "../scripts/filters.js";
import Liste from "../scripts/recipeList.js";
import Recipes from "../data/recipes.js";

const list = new Liste(Recipes);

const initFilter = new SearchAndFilter(list.list);
