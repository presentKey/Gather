export default function calcTotalPrice(histories, id) {
  return histories
    .filter((history) => history.id !== id)
    .reduce((prev, current) => prev + current.price, 0);
}
