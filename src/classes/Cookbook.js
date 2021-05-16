class Cookbook {
  constructor(recipes) {
    this.cookbook = recipes;
  }
  filterByTag(tag) {
    const filteredByTag = this.cookbook.filter(item => item.tags.includes(tag));
    return filteredByTag
  }
  filterByNameOrIng(nameOrIng) {
    console.log(ingredientsData)

  }
}

export default Cookbook;
