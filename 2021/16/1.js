import { solution } from '../utils.js';

await solution(
  import.meta.url,
  `

A0016C880162017C3686B18A3D4780

  `,
  '31',
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
            children,
          };
        }
      }
    }
    const packet = parsePacket();
    function totalVersionNums(packet) {
      return (
        packet.version +
        packet.children.reduce(
          (total, packet) => total + totalVersionNums(packet),
          0,
        )
      );
    }
    return totalVersionNums(packet);
  },
);
