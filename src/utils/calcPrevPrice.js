export default function calcPrevPrice(histories) {
  return histories.reduce((prev, current) => {
    if (current.type === 'classModify') {
      return prev;
    }
    return prev + current.price;
  }, 0);
}
