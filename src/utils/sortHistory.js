/**
 * 내역을 최신순으로 정렬하는 함수
 * @desc 생성 날짜를 기준으로 내림차순
 * @desc 생성 날짜가 동일한 경우, 생성 시간을 기준으로 내림차순
 */
export default function sortHistory(histories) {
  return histories.sort((a, b) => new Date(b.date) - new Date(a.date) || b.timestamp - a.timestamp);
}
