export default function showMax7Members(memberList) {
  if (memberList.length < 8) {
    return [memberList, 0];
  }

  return [memberList.slice(0, 7), memberList.length - 7];
}
