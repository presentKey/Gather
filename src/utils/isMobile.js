export default function isMobile() {
  if (/Firefox/i.test(navigator.userAgent)) return;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
