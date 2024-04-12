const getNumbers = () => {
  const numbers: number[] = [];

  for (let i = 0; i < 10000; i++) {
    const input = prompt("数値を入力してください:");
    console.log(input);
    if (!input) {
      break;
    }
    const number = parseInt(input, 10);

    if (isNaN(number)) {
      console.warn("数値を入力してください!!!");
      continue;
    }
    numbers.push(number);
  }
  return numbers;
};

const main = () => {
  const numbers = getNumbers();

  const result = numbers.reduce((acc, cur) => {
    return Math.max(acc, acc + cur);
  }, 0);

  console.log(result);
};

main();
