/**
 * 최대 7명의 인원을 표시하고, 초과하는 인원을 숫자로 나타내는 함수
 * @param memberList 멤버 List
 */
export default function showMax7Members(memberList) {
  if (memberList.length < 8) {
    return [memberList, 0];
  }

  return [memberList.slice(0, 7), memberList.length - 7];
}
