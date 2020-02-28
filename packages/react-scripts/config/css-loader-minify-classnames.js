'use strict';

const createMinifier = () => {
  const map = new Map();
  let index = 0;

  return (context, localIdentName, localName) => {
    const key = `${context.resourcePath}#${localName}`;

    let name = map.get(key);
    if (!name) {
      name = numberHash(index++, defaultCharacters, defaultPrefixCharacters);
      map.set(key, name);
    }

    return name;
  };
};

module.exports = createMinifier;

const assert = require('assert');

const defaultCharacters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
const defaultPrefixCharacters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function numberHash(number, characters = defaultCharacters, prefixCharacters) {
  assert(number >= 0, 'Attempted to hash a negative number');

  prefixCharacters = prefixCharacters || characters;

  let currentCharacters = prefixCharacters;
  let factor = Math.floor(number);
  let hash = '';

  do {
    const remainder = factor % currentCharacters.length;

    hash = currentCharacters[remainder] + hash;

    factor = Math.floor(factor / currentCharacters.length);
    currentCharacters = characters;
  } while (factor > 0);

  return hash;
}
