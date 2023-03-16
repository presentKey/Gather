export default function clipboard(code, closeModal) {
  const text = `https://주소.com
모임 코드: ${code}`;
  window.navigator.clipboard
    .writeText(text) //
    .then(closeModal);
}
