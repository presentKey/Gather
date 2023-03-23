export default function clipboard(code, closeModal) {
  const text = `https://warm-kulfi-2043c3.netlify.app/
모임 코드: ${code}`;
  window.navigator.clipboard
    .writeText(text) //
    .then(closeModal);
}
