const Node = require('./Node');

export default class Trie {
  constructor() {
    this.wordCount = 0;
    this.root = {'children': {}};
  }

  count() {
    return this.wordCount;
  }

  insert(word) {
    let letters = [...word];
    let currNode = this.root;

    while (letters.length) {
      let letter = letters[0];
      let node = new Node();

      if (!currNode.children[letter]) {
        currNode.children[letter] = node;
      } 
      currNode = currNode.children[letter];
      letters.shift();
    }

    if (!currNode.endOfWord) {
      currNode.endOfWord = true;
      this.wordCount++;
    }
    return;
  }

  getSuggestions(word) {
    let suggestions = [];
    let letters = [...word];
    let currNode = this.root;

    for(let i = 0; i < letters.length; i++) {
      currNode = currNode.children[letters[i]];
      if (!currNode) {
        return [];
      }
    }

    searchForWords(word, currNode);
    
    suggestions.sort((a, b) => {
      return b.val - a.val;
    }) 

    suggestions = suggestions.map(word => {
      word = word.name;
      return word;
    });

    return suggestions;

    function searchForWords(word, currNode) {
      Object.keys(currNode.children).forEach(letter => {
        let newSearch = word + letter;
        if (currNode.children[letter].endOfWord) {
          suggestions.push({'name': newSearch, 'val': currNode.children[letter].popularity});
        }
        searchForWords(newSearch, currNode.children[letter]);
      })
    }
  }

  populate(words) {
    words.forEach(word => this.insert(word));
  }

  search(word) {
    let inputs = [...word];
    let currNode = this.root;

    for (let i = 0; i < inputs.length; i++) {
      if (!currNode) {
        this.insert(word);
        return false;
      }
      currNode = currNode.children[inputs[i]];
    }
    
    if (currNode.endOfWord) {
      currNode.popularity++;
      return true;
    }
    return false;
  }

  removeWord(word) {
    let inputs = [...word];
    let currNode = this.root;
    let prevNode = currNode;
    let key;

    for (key = 0; key < inputs.length; key++) {
      if (!currNode) {
        return null;
      }
      prevNode = currNode;
      currNode = currNode.children[inputs[key]];
    }

    if (currNode.endOfWord) {
      currNode.endOfWord = false;
      this.wordCount--;
    }
    if (!Object.keys(currNode.children).length) {
      delete prevNode.children[inputs[key - 1]]
    }
  }
}

