class Cookbook {
  constructor(recipes) {
    this.cookbook = recipes;
  }
  filterByTag(tag) {
    const filteredByTag = this.cookbook.filter(item => item.tags.includes(tag));
    return filteredByTag
  }
  filterByName(recipeName) {
    const filteredName = this.cookbook.filter(item => item.name.includes(recipeName));
    return filteredName
  }
  filterByIngredient() {

  }
}

export default Cookbook;
