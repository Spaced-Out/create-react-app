'use strict';

const createMinifier = () => {
  const map = new Map();
  let index = 0;

  return (context, localIdentName, localName) => {
    const key = `${context.resourcePath}#${localName}`;

    let name = map.get(key);
    if (!name) {
      name = numberHash(index++);
      map.set(key, name);
    }

    return name;
  };
};

module.exports = createMinifier;

const assert = require('assert');

const defaultCharacters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ10123456789';

function numberHash(number, characters = defaultCharacters) {
  assert(number >= 0, 'Attempted to hash a negative number');

  let factor = Math.floor(number);
  let hash = '';

  do {
    const remainder = factor % characters.length;

    hash = characters[remainder] + hash;

    factor = Math.floor(factor / characters.length);
  } while (factor > 0);

  return hash;
}
