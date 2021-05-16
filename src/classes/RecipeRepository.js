class RecipeRepository {
  constructor(recipes) {
    this.cookbook = recipes;
  }
  filterByTag(tag) {
    const filteredByTag = this.cookbook.filter(item => item.tags.includes(tag));
    return filteredByTag
  }
  filterByNameOrIng(nameOrIng) {
    const filteredByName = this.cookbook.filter(item => item.name.includes(nameOrIng));
    return filteredByName
  }
}

export default RecipeRepository;
