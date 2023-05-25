/**
 * 날짜 정규식 검사
 * @example 2023-05-25
 * @param date 날짜
 */
export default function checkDateRegExp(date) {
  return /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(date);
}
