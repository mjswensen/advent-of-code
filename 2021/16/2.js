import { solution } from '../utils.js';

await solution(
  import.meta.url,
  `

D8005AC2A8F0

  `,
  '1',
  (hexInput) => {
    return hexInput
      .split('')
      .map((char) => parseInt(char, 16).toString(2).padStart(4, '0'))
      .join('');
  },
  (binString) => {
    let position = 0;
    function advance(length) {
      const data = binString.slice(position, position + length);
      position += length;
      return data;
    }
    function parsePacket() {
      const version = parseInt(advance(3), 2);
      const typeId = parseInt(advance(3), 2);
      if (typeId === 4) {
        let value = '';
        while (true) {
          const part = advance(5);
          const [prefix, ...rest] = part.slice('');
          value += rest.join('');
          if (prefix === '0') {
            break;
          }
        }
        return {
          version,
          typeId,
          literalValue: parseInt(value, 2),
          children: [],
        };
      } else {
        const lengthTypeId = advance(1);
        if (lengthTypeId === '0') {
          const length = parseInt(advance(15), 2);
          const children = [];
          const startPos = position;
          while (position - startPos < length) {
            children.push(parsePacket());
          }
          return {
            version,
            typeId,
            children,
          };
        } else {
          const count = parseInt(advance(11), 2);
          const children = [];
          for (let i = 0; i < count; i++) {
            children.push(parsePacket());
          }
          return {
            version,
            typeId,
            children,
          };
        }
      }
    }
    const packet = parsePacket();
    function calculate(packet) {
      switch (packet.typeId) {
        case 0:
          return packet.children.reduce(
            (sum, child) => sum + calculate(child),
            0,
          );
        case 1:
          return packet.children.reduce(
            (product, child) => product * calculate(child),
            1,
          );
        case 2:
          return Math.min(...packet.children.map((child) => calculate(child)));
        case 3:
          return Math.max(...packet.children.map((child) => calculate(child)));
        case 4:
          return packet.literalValue;
        case 5:
          return calculate(packet.children[0]) > calculate(packet.children[1])
            ? 1
            : 0;
        case 6:
          return calculate(packet.children[0]) < calculate(packet.children[1])
            ? 1
            : 0;
        case 7:
          return calculate(packet.children[0]) === calculate(packet.children[1])
            ? 1
            : 0;
      }
    }
    return calculate(packet);
  },
);
