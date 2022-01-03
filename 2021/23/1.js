import { deepStrictEqual } from 'node:assert/strict';
import heapq from 'heapq';
import { solution } from '../utils.js';

export const allKeys = [
  'leftHallwayLeft',
  'leftHallwayRight',
  'centerLeftHallway',
  'centerHallway',
  'centerRightHallway',
  'rightHallwayLeft',
  'rightHallwayRight',
  'roomABottom',
  'roomATop',
  'roomBBottom',
  'roomBTop',
  'roomCBottom',
  'roomCTop',
  'roomDBottom',
  'roomDTop',
];

const hallwayBlockingKeys = [
  'leftHallwayRight',
  'centerLeftHallway',
  'centerHallway',
  'centerRightHallway',
  'rightHallwayLeft',
];

const getHallwayBlockingKeyIndex = (key) => {
  const idx = hallwayBlockingKeys.indexOf(key);
  if (idx > -1) {
    return idx;
  } else {
    switch (key) {
      case 'leftHallwayLeft':
        return 0;
      case 'roomABottom':
      case 'roomATop':
        return 1;
      case 'roomBBottom':
      case 'roomBTop':
        return 2;
      case 'roomCBottom':
      case 'roomCTop':
        return 3;
      case 'roomDBottom':
      case 'roomDTop':
        return 4;
      case 'rightHallwayRight':
        return 5;
    }
  }
};

const getRoomBlockingKey = (key) => {
  switch (key) {
    case 'roomABottom':
      return 'roomATop';
    case 'roomBBottom':
      return 'roomBTop';
    case 'roomCBottom':
      return 'roomCTop';
    case 'roomDBottom':
      return 'roomDTop';
  }
};

const blockingKeys = (fromKey, toKey) => {
  const fromIdx = getHallwayBlockingKeyIndex(fromKey);
  const toIdx = getHallwayBlockingKeyIndex(toKey);
  const initialKeys = hallwayBlockingKeys.slice(
    Math.min(fromIdx, toIdx),
    Math.max(fromIdx, toIdx),
  );
  return [
    getRoomBlockingKey(fromKey),
    ...initialKeys,
    getRoomBlockingKey(toKey),
  ].filter((key) => key !== fromKey && key !== toKey && key !== undefined);
};

deepStrictEqual(blockingKeys('leftHallwayLeft', 'roomATop'), [
  'leftHallwayRight',
]);

deepStrictEqual(blockingKeys('roomABottom', 'roomBBottom'), [
  'roomATop',
  'centerLeftHallway',
  'roomBTop',
]);

deepStrictEqual(blockingKeys('roomDTop', 'roomBTop'), [
  'centerHallway',
  'centerRightHallway',
]);

deepStrictEqual(blockingKeys('roomCBottom', 'leftHallwayRight'), [
  'roomCTop',
  'centerLeftHallway',
  'centerHallway',
]);

const print = (state) => {
  const hallway = [
    state.leftHallwayLeft || '.',
    state.leftHallwayRight || '.',
    '.',
    state.centerLeftHallway || '.',
    '.',
    state.centerHallway || '.',
    '.',
    state.centerRightHallway || '.',
    '.',
    state.rightHallwayLeft || '.',
    state.rightHallwayRight || '.',
  ].join('');
  const roomTopRow = [
    state.roomATop || '.',
    state.roomBTop || '.',
    state.roomCTop || '.',
    state.roomDTop || '.',
  ].join('#');
  const roomBottomRow = [
    state.roomABottom || '.',
    state.roomBBottom || '.',
    state.roomCBottom || '.',
    state.roomDBottom || '.',
  ].join('#');
  console.log(
    `
#############
#${hallway}#
###${roomTopRow}###
  #${roomBottomRow}#
  #########
  `.trim(),
  );
};

await solution(
  import.meta.url,
  `

#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########

  `,
  '12521',
  (input) => {
    const getDistance = (fromKey, toKey) => {
      const coordinates = {
        leftHallwayLeft: [1, 0],
        leftHallwayRight: [2, 0],
        centerLeftHallway: [4, 0],
        centerHallway: [6, 0],
        centerRightHallway: [8, 0],
        rightHallwayRight: [11, 0],
        rightHallwayLeft: [10, 0],
        roomABottom: [3, 2],
        roomATop: [3, 1],
        roomBBottom: [5, 2],
        roomBTop: [5, 1],
        roomCBottom: [7, 2],
        roomCTop: [7, 1],
        roomDBottom: [9, 2],
        roomDTop: [9, 1],
      };
      const [startX, startY] = coordinates[fromKey];
      const [endX, endY] = coordinates[toKey];
      return Math.abs(endX - startX) + startY + endY;
    };

    const getEnergy = (fromKey, toKey, value) => {
      const distance = getDistance(fromKey, toKey);
      switch (value) {
        case 'A':
          return distance;
        case 'B':
          return distance * 10;
        case 'C':
          return distance * 100;
        case 'D':
          return distance * 1000;
      }
    };

    const move = (state, fromKey, toKey) => ({
      ...state,
      energySpent:
        state.energySpent + getEnergy(fromKey, toKey, state[fromKey]),
      [fromKey]: null,
      [toKey]: state[fromKey],
    });

    const validMove = (state, fromKey, toKey) => {
      const value = state[fromKey];
      if (!value) return false;
      if (fromKey === toKey) return false;
      if (fromKey.includes('Hallway') && toKey.includes('Hallway'))
        return false;
      if (!!state[toKey]) return false;
      if (toKey.includes('room') && !toKey.includes(`room${value}`))
        return false;
      if (toKey === `room${value}Top` && state[`room${value}Bottom`] !== value)
        return false;
      if (fromKey === `room${value}Bottom`) return false;
      if (
        fromKey === `room${value}Top` &&
        state[`room${value}Bottom`] === value
      )
        return false;
      for (const key of blockingKeys(fromKey, toKey)) {
        if (!!state[key]) {
          return false;
        }
      }
      return true;
    };

    const nextStates = (state) => {
      const nextStates = [];

      for (const fromKey of allKeys) {
        for (const toKey of allKeys) {
          if (validMove(state, fromKey, toKey)) {
            if (toKey.startsWith('room')) {
              return [move(state, fromKey, toKey)];
            } else {
              nextStates.push(move(state, fromKey, toKey));
            }
          }
        }
      }

      return nextStates;
    };

    const isFinished = ({
      roomABottom,
      roomATop,
      roomBBottom,
      roomBTop,
      roomCBottom,
      roomCTop,
      roomDBottom,
      roomDTop,
    }) =>
      roomABottom === 'A' &&
      roomATop === 'A' &&
      roomBBottom === 'B' &&
      roomBTop === 'B' &&
      roomCBottom === 'C' &&
      roomCTop === 'C' &&
      roomDBottom === 'D' &&
      roomDTop === 'D';

    const heap = [];
    const comparator = (a, b) => a.energySpent < b.energySpent;
    const push = (state) => heapq.push(heap, state, comparator);
    const pop = () => heapq.pop(heap, comparator);

    const initialState = {
      energySpent: 0,
      leftHallwayLeft: null,
      leftHallwayRight: null,
      centerLeftHallway: null,
      centerHallway: null,
      centerRightHallway: null,
      rightHallwayRight: null,
      rightHallwayLeft: null,
      roomABottom: input[45],
      roomATop: input[31],
      roomBBottom: input[47],
      roomBTop: input[33],
      roomCBottom: input[49],
      roomCTop: input[35],
      roomDBottom: input[51],
      roomDTop: input[37],
    };
    push(initialState);

    while (true) {
      const state = pop();
      if (isFinished(state)) {
        return state.energySpent;
      } else {
        for (const nextState of nextStates(state)) {
          push(nextState);
        }
      }
    }
  },
);
