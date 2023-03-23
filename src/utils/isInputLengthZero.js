export default function isInputLengthZero(value) {
  if (String(value).trim().length === 0) {
    return true;
  }
  return false;
}
