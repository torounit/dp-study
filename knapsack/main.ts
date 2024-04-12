import { parse } from "https://deno.land/std@0.222.1/csv/mod.ts";

const full = <T>( length: number, value: T ) => Array.from({ length }, () => value);

const getLimit = () => {
  const input = prompt("重量制限を入力してください:");
  if (!input) {
    return null;
  }
  const limit = parseInt(input, 10);

  if (isNaN(limit)) {
    console.warn("不正な入力です");
    return null;
  }
  return limit;
};

export const getItems = async () => {
  const path = new URL(import.meta.resolve("./items.csv"));
  const text = await Deno.readTextFile(path);
  const data = parse(text, { skipFirstRow: true });
  return data.map(({ weight, value }) => ({
    weight: parseInt(weight ?? "0", 10),
    value: parseInt(value ?? "0", 10),
  }));
};

const main = async () => {
  const limit = getLimit();
  if (!limit) {
    console.warn("Error");
    return;
  }

  const items = await getItems();
  const table = items.reduce<number[][]>(
    (acc, item, i) => {
      const line = acc[i].map((value, weight) => {
        if (weight < item.weight) {
          return value;
        }
        return Math.max(value, acc[i][weight - item.weight] + item.value);
      });
      return [...acc, line];
    },
    [full(limit + 1, 0)]
  );

  console.log(table[items.length][limit]);
  prompt("OK?");
};

main();
