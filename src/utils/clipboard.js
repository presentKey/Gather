/**
 * 클립보드 text 내용
 * @param code 모임의 고유 코드
 * @param closeModal 모달 닫기
 */
export default function clipboard(code, closeModal) {
  const text = `https://warm-kulfi-2043c3.netlify.app/
모임 코드: ${code}`;
  window.navigator.clipboard
    .writeText(text) //
    .then(closeModal);
}
