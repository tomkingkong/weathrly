module.exports = class Node {
  constructor() {
    this.endOfWord = false;
    this.popularity = 0;
    this.children = {};
  }
}