/**
 * 계좌번호 정규식 검사
 * @example 12312345555
 * @param number 계좌번호
 */
export default function checkAccountNumberRegExp(number) {
  return /^[0-9]+$/.test(number);
}
