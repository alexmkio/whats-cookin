class RecipeRepository {
  constructor(recipes) {
    this.cookbook = recipes;
  }
  filterByTag(tag) {
    const filtered = this.cookbook.filter(item => item.tags.includes(tag));
    return filtered
  }
}

export default RecipeRepository;
