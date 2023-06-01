/**
 * 모임 코드 복사
 * @param code 모임의 고유 코드
 * @param setToast state set function
 */
export function copyCode(code, setToast) {
  setToast(false);
  const text = `https://warm-kulfi-2043c3.netlify.app/
모임 코드: ${code}`;

  window.navigator.clipboard
    .writeText(text) //
    .then(
      () => setToast(true), // clipboard successfully set
      () => setToast(false) // clipboard write failed);
    );
}

/**
 * 계좌번호 복사
 * @param number 계좌번호
 * @param setOpen state set function
 */
export function copyAccountNumber(number, setToast) {
  setToast(false);
  window.navigator.clipboard.writeText(number).then(
    () => setToast(true), // clipboard successfully set
    () => setToast(false) // clipboard write failed
  );
}
