import { deepStrictEqual } from 'node:assert/strict';
import { cloneDeep, get, set } from 'lodash-es';

export function toTree(value) {
  if (typeof value === 'number') {
    return {
      value,
    };
  } else {
    const [left, right] = value;
    return {
      left: toTree(left),
      right: toTree(right),
    };
  }
}

deepStrictEqual(
  toTree([
    [1, 2],
    [3, 4],
  ]),
  {
    left: {
      left: { value: 1 },
      right: { value: 2 },
    },
    right: {
      left: { value: 3 },
      right: { value: 4 },
    },
  },
);

deepStrictEqual(
  toTree([
    [3, [2, [8, 0]]],
    [9, [5, [4, [3, 2]]]],
  ]),
  {
    left: {
      left: { value: 3 },
      right: {
        left: { value: 2 },
        right: {
          left: { value: 8 },
          right: { value: 0 },
        },
      },
    },
    right: {
      left: { value: 9 },
      right: {
        left: { value: 5 },
        right: {
          left: { value: 4 },
          right: {
            left: { value: 3 },
            right: { value: 2 },
          },
        },
      },
    },
  },
);

export function fromTree(node) {
  if (typeof node.value === 'number') {
    return node.value;
  } else {
    return [fromTree(node.left), fromTree(node.right)];
  }
}

deepStrictEqual(
  fromTree({
    left: {
      left: { value: 1 },
      right: { value: 2 },
    },
    right: {
      left: { value: 3 },
      right: { value: 4 },
    },
  }),
  [
    [1, 2],
    [3, 4],
  ],
);

deepStrictEqual(
  fromTree({
    left: {
      left: { value: 3 },
      right: {
        left: { value: 2 },
        right: {
          left: { value: 8 },
          right: { value: 0 },
        },
      },
    },
    right: {
      left: { value: 9 },
      right: {
        left: { value: 5 },
        right: {
          left: { value: 4 },
          right: {
            left: { value: 3 },
            right: { value: 2 },
          },
        },
      },
    },
  }),
  [
    [3, [2, [8, 0]]],
    [9, [5, [4, [3, 2]]]],
  ],
);

export function find(tree, iteratee) {
  let currNode = tree;
  let path = [];
  let visited = new Set();
  while (true) {
    visited.add(currNode);
    if (iteratee(path, currNode)) {
      return path;
    }
    if (currNode.left && !visited.has(currNode.left)) {
      path.push('left');
    } else if (currNode.right && !visited.has(currNode.right)) {
      path.push('right');
    } else {
      if (path.length === 0) {
        break;
      } else {
        path.pop();
      }
    }
    if (path.length) {
      currNode = get(tree, path);
    } else {
      currNode = tree;
    }
  }
}

export function explodeOnce(tree) {
  const newTree = cloneDeep(tree);
  const explodablePath = find(
    newTree,
    (path, node) => path.length === 4 && node.value === undefined,
  );
  if (!explodablePath) return;
  const explodable = get(newTree, explodablePath);
  // Add left
  const leftNum = explodable.left.value;
  const leftPath = cloneDeep(explodablePath);
  while (leftPath.length > 0) {
    if (leftPath.pop() === 'right') {
      leftPath.push('left');
      break;
    }
  }
  if (leftPath[leftPath.length - 1] === 'left') {
    while (true) {
      const node = get(newTree, leftPath);
      if (node.right) {
        leftPath.push('right');
      } else {
        set(newTree, leftPath, {
          value: get(newTree, leftPath).value + leftNum,
        });
        break;
      }
    }
  }
  // Add right
  const rightNum = explodable.right.value;
  const rightPath = cloneDeep(explodablePath);
  while (rightPath.length > 0) {
    if (rightPath.pop() === 'left') {
      rightPath.push('right');
      break;
    }
  }
  if (rightPath[rightPath.length - 1] === 'right') {
    while (true) {
      const node = get(newTree, rightPath);
      if (node.right) {
        rightPath.push('left');
      } else {
        set(newTree, rightPath, {
          value: get(newTree, rightPath).value + rightNum,
        });
        break;
      }
    }
  }
  // Set node to 0
  set(newTree, explodablePath, { value: 0 });
  return newTree;
}

deepStrictEqual(fromTree(explodeOnce(toTree([[[[[9, 8], 1], 2], 3], 4]))), [
  [[[0, 9], 2], 3],
  4,
]);

deepStrictEqual(fromTree(explodeOnce(toTree([7, [6, [5, [4, [3, 2]]]]]))), [
  7,
  [6, [5, [7, 0]]],
]);

deepStrictEqual(fromTree(explodeOnce(toTree([[6, [5, [4, [3, 2]]]], 1]))), [
  [6, [5, [7, 0]]],
  3,
]);

export function splitOnce(tree) {
  const newTree = cloneDeep(tree);
  const splittablePath = find(newTree, (_, node) => node.value >= 10);
  if (!splittablePath) return;
  const currentValue = get(newTree, splittablePath).value;
  set(newTree, splittablePath, {
    left: { value: Math.floor(currentValue / 2) },
    right: { value: Math.ceil(currentValue / 2) },
  });
  return newTree;
}

deepStrictEqual(fromTree(splitOnce(toTree([11, 1]))), [[5, 6], 1]);

deepStrictEqual(fromTree(splitOnce(toTree([10, 1]))), [[5, 5], 1]);

export function add(left, right) {
  let newTree = { left, right };
  while (true) {
    const exploded = explodeOnce(newTree);
    if (exploded) {
      newTree = exploded;
      continue;
    }
    const splitted = splitOnce(newTree);
    if (splitted) {
      newTree = splitted;
      continue;
    }
    break;
  }
  return newTree;
}

export function magnitude(node) {
  if (typeof node.value === 'number') {
    return node.value;
  } else {
    return 3 * magnitude(node.left) + 2 * magnitude(node.right);
  }
}

deepStrictEqual(magnitude({ left: { value: 9 }, right: { value: 1 } }), 29);

deepStrictEqual(
  magnitude({
    left: {
      left: { value: 9 },
      right: { value: 1 },
    },
    right: {
      left: { value: 1 },
      right: { value: 9 },
    },
  }),
  129,
);
