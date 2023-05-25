/**
 * 오늘 날짜를 반환하는 함수
 * @example 2023-05-25
 */
export default function getTodayDate() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
}
