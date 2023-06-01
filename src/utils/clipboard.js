/**
 * 모임 코드 복사
 * @param code 모임의 고유 코드
 * @param closeModal 모달 닫기
 */
export function copyCode(code, closeModal) {
  const text = `https://warm-kulfi-2043c3.netlify.app/
모임 코드: ${code}`;
  window.navigator.clipboard
    .writeText(text) //
    .then(closeModal);
}

/**
 * 계좌번호 복사
 * @param number 계좌번호
 */
export function copyAccountNumber(number) {
  window.navigator.clipboard.writeText(number);
}
