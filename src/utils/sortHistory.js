export default function sortHistory(histories) {
  return histories.sort(
    (a, b) => new Date(b.date) - new Date(a.date) || b.timestamp - a.timestamp
  );
}
