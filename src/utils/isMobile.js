/**
 * 접속 기기 판별 함수
 * @desc 모바일 기기에서 Firefox 제외
 * */
export default function isMobile() {
  if (/Firefox/i.test(navigator.userAgent)) return;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
